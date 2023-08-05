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
import { searchByTitle, getByGogoId, getByTitle } from "@/utils/Watch-Funcs";

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

async function getPageData(id: string, epNumber = 1, title = "") {
  const response = await fetch(
    `https://consum-net-api.vercel.app/meta/anilist/info/${id}`
  );
  if (!response.ok) throw new Error("cant get info on it");

  const data: Info = await response.json();

  if (data.episodes.length === 0) throw new Error("no episodes for this one");

  let currentEp: aniEps | gogoEps | undefined;
  let animeEpisodes: (aniEps | gogoEps)[] = []

  const idData = await getByGogoId(title, epNumber);
  currentEp = idData[0];
  if (idData[1] !== undefined) animeEpisodes = idData[1];

  // if true it follows GogoAnime id convention
  // it might also dub too
  const checkGogo = /-episode-\d+$/;

  if (currentEp === undefined) {
    // we gona use Gogo anime search here
    const animeName = title.replace(/[^\w\s]/gi, "");
    const search = await searchByTitle(animeName, epNumber);
    if (search[0] !== undefined) currentEp = search[0];
    if (search[1] !== undefined) animeEpisodes = search[1];
  }

  if (currentEp === undefined) {
    // maybe the title in the search params is
    // not helping so lets try this atleast
    const getId = data.episodes[0].id;
    const isGogo = checkGogo.test(getId);

    if (isGogo) {
      const titleData = await getByTitle(getId, epNumber);
      currentEp = titleData[0];
      if (titleData[1] !== undefined) animeEpisodes = titleData[1];
    }
  }

  if (currentEp === undefined) {
    // 🥲 damm. were gonna have to use Anilist
    animeEpisodes = data.episodes
    currentEp = animeEpisodes.find(e => e.number === epNumber)
  }

  if (currentEp === undefined || animeEpisodes.length === 0) throw new Error("Cant get Ep")

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
