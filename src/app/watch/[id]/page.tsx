import Episodes from "@/components/WatchPage-comps/Episodes";
import Servers from "@/components/WatchPage-comps/Servers-comp";
import { Episode, Info } from "@/types/Anilist/AnimeInfo";
import { StreamingLinks } from "@/types/Anilist/AnimeStreamingLlinks";

import { FaDownload } from "react-icons/fa";
import Link from "next/link";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { epNum: string | undefined };
};

type infoObj = {
  animeId: string;
  name: string;
  episodes: Episode[];
  currentEp: StreamingLinks;
  currentEpDub?: StreamingLinks;
  epId: string;
};

async function getPageData(id: string, epNumber = 1) {
  const response = await fetch(
    `https://consum-net-api.vercel.app/meta/anilist/info/${id}`
  );
  const data: Info = await response.json();
  const showEp = data.episodes.find((ep) => ep.number === epNumber) as Episode;
  const epResponse = await fetch(
    `https://consum-net-api.vercel.app/meta/anilist/watch/${showEp.id}`
  );
  const epData: StreamingLinks = await epResponse.json();

  const info: infoObj = {
    animeId: data.id,
    name: data.title.userPreferred ?? data.title.english ?? data.title.native,
    episodes: data.episodes,
    currentEp: epData,
    epId: showEp.id,
  };

  const canDub = /-episode-\d+$/;
  if (canDub.test(showEp.id)) {
    const ep = showEp.id.split("-episode-");
    const dubEp = ep.join("-dub-episode-");
    const response = await fetch(
      `https://consum-net-api.vercel.app/meta/anilist/watch/${dubEp}`
    );
    if (response.ok) {
      console.log("it can dub ok");
      const data: StreamingLinks = await response.json();
      info.currentEpDub = data;
    }
  }

  return info;
}

async function WatchPage({
  params: { id },
  searchParams: { epNum = "1" },
}: Props) {
  console.log(`AnimeId is: ${id}, epNum: ${epNum}`);
  const data = await getPageData(id, +epNum);
  const { currentEp, name: animeName, episodes, epId, currentEpDub } = data;
  console.log(currentEp);
  episodes.reverse();

  return (
    <section className="py-3">
      <h1 className="text-2xl font-bold">{animeName}</h1>
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
        className="my-3 aspect-[16/11] w-full"
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
      <Servers epId={epId} />

      <Episodes epNum={+epNum} episodes={episodes} id={id} />
    </section>
  );
}

export default WatchPage;
