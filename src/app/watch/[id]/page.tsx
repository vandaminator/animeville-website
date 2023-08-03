import Episodes from "@/components/WatchPage-comps/Episodes";
import Servers from "@/components/WatchPage-comps/Servers-comp";
import { Episode as aniEps, Info } from "@/types/Anilist/AnimeInfo";
import { StreamingLinks as aniStreamLinks } from "@/types/Anilist/AnimeStreamingLlinks";

import { FaDownload } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { infoUrl, watchUrl } from "@/utils/GogoAnime/Urls";
import Description, {
  Episode as gogoEps,
} from "@/types/GogoAnime/AnimeDescription";
import gogoStream from "@/types/GogoAnime/AnimeStreamingLinks";
import { streamUrl } from "@/utils/Anilist/Urls";

type Props = {
  params: { id: string };
  searchParams: { epNum: string | undefined; title: string };
};

type infoObj = {
  animeId: string;
  episodes: (aniEps | gogoEps)[];
  currentEp: aniStreamLinks | gogoStream;
  currentEpDub?: aniStreamLinks | gogoStream;
  epId: string;
  canGogo: boolean;
};

async function getPageData(id: string, epNumber = 1, title: string) {
  const response = await fetch(
    `https://consum-net-api.vercel.app/meta/anilist/info/${id}`
  );
  if (!response.ok) throw new Error("cant get info on it")

  const data: Info = await response.json();

  if (data.episodes.length === 0) throw new Error("no episodes for this one")
  
  const toHyphenatedLowerCase = (str: string) => {
    const hyphenatedStr = str
      .replace(/[^a-zA-Z0-9]+/g, "-") // Replace non-alphanumeric characters with a single hyphen
      .replace(/^-+|-+$/g, "") // Remove hyphens from the beginning or end of the string
      .toLowerCase(); // Convert to lowercase
    return hyphenatedStr;
  };
  const gogoId = toHyphenatedLowerCase(title);
  const gogoUrl = infoUrl(gogoId);
  const gogoResponse = await fetch(gogoUrl);

  let currentEp: aniEps | gogoEps | undefined;
  let animeEpisodes: (aniEps | gogoEps)[];

  if (gogoResponse.ok) {
    const gogoData: Description = await gogoResponse.json();
    animeEpisodes = gogoData.episodes;
    currentEp = animeEpisodes.find((ep) => ep.number === epNumber);
  } else {
    animeEpisodes = data.episodes;
    currentEp = animeEpisodes.find((ep) => ep.number === epNumber);
  }

  // if true it follows GogoAnime id convention
  // it might also dub too
  const checkGogo = /-episode-\d+$/;

  if (currentEp === undefined) {
    // maybe the title in the search params is
    // not helping so lets try this atleast

    const getId = animeEpisodes[0].id;
    const isGogo = checkGogo.test(getId);

    if (isGogo) {
      const idEpWantedArray = getId.split("-episode-");
      const newId = idEpWantedArray[0];

      const newGogoRes = await fetch(infoUrl(newId));
      if (newGogoRes.ok) {
        const newGogoData: Description = await newGogoRes.json();
        animeEpisodes = newGogoData.episodes;
        currentEp = animeEpisodes.find((value) => value.number === epNumber);

        if (currentEp === undefined) throw new Error("Episode is unavaliable");
      } else throw new Error("Episode is unavaliable");
    } else throw new Error("Episode is unavaliable");
  }

  const canGogo = checkGogo.test(currentEp.id);
  let dataEp: aniStreamLinks | gogoStream;

  // it looks fat but its has performance 😂
  if (canGogo) {
    const gogoWResponse = await fetch(watchUrl(currentEp.id));
    if (gogoWResponse.ok) dataEp = await gogoWResponse.json();
    else {
      const aniWResponse = await fetch(streamUrl(currentEp.id));
      if (aniWResponse.ok) dataEp = await aniWResponse.json();
      else throw new Error("cant get streaming link");
    }
  } else {
    const aniWResponse = await fetch(streamUrl(currentEp.id));
    if (aniWResponse.ok) dataEp = await aniWResponse.json();
    else throw new Error("cant get streaming link");
  }

  const info: infoObj = {
    animeId: data.id,
    episodes: animeEpisodes,
    currentEp: dataEp,
    epId: currentEp.id,
    canGogo,
  };

  if (canGogo) {
    const ep = currentEp.id.split("-episode-");
    const dubEp = ep.join("-dub-episode-");
    const gogoDubResponse = await fetch(watchUrl(dubEp));
    if (gogoDubResponse.ok) {
      const data: gogoStream = await gogoDubResponse.json();
      info.currentEpDub = data;
    } else {
      const aniDubResponse = await fetch(streamUrl(dubEp));
      if (aniDubResponse.ok) {
        const data: aniStreamLinks = await aniDubResponse.json();
        info.currentEpDub = data;
      }
    }
  }

  return info;
}

async function WatchPage({
  params: { id },
  searchParams: { epNum = "1", title },
}: Props) {
  const data = await getPageData(id, +epNum, title);
  const { currentEp, episodes, epId, currentEpDub, canGogo } = data;
  episodes.sort((a, b) => a.number - b.number);
  const epNumbers = episodes.map((ep) => ep.number);

  return (
    <section className="py-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      {/* Menu */}
      <div className="flex justify-between bg-lightjetblack px-5 py-2">
        <p>{`EP.${epNum}`}</p>
        <div className="flex">
          <a
            href={currentEp.download}
            className="mx-2 flex gap-1 no-underline hover:text-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDownload size={"18px"} />
            <p>Sub</p>
          </a>
          {currentEpDub !== undefined && (
            <a
              href={currentEpDub.download}
              className="mx-2 flex gap-1 no-underline hover:text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload size={"18px"} />
              <p>Dub</p>
            </a>
          )}
        </div>
      </div>

      {/* video */}
      <iframe
        src={currentEp.headers.Referer}
        className="my-3 flex aspect-square w-full items-center justify-center bg-black min-[360px]:aspect-[10/8] min-[420px]:aspect-[10/7] min-[480px]:aspect-video "
        id="myVid"
        allowFullScreen
      ></iframe>

      {/* Anime info page */}
      <Link
        href={`/info/${id}`}
        className="my-4 rounded-md bg-gold p-2 font-bold text-black no-underline"
      >
        Info
      </Link>

      {/* Servers Dub Sub */}
      <Servers epId={epId} canGogo={canGogo} />

      <Episodes epNum={+epNum} episodes={epNumbers} id={id} title={title} />
    </section>
  );
}

export default WatchPage;
