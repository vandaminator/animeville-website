import Episodes from "@/components/WatchPage-comps/Episodes";
import Servers from "@/components/WatchPage-comps/Servers-comp";
import { Episode, Info } from "@/types/Anilist/AnimeInfo";
import { StreamingLinks } from "@/types/Anilist/AnimeStreamingLlinks";
import Link from "next/link";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { epNum: string | undefined };
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

  const info = {
    animeId: data.id,
    name: data.title.userPreferred ?? data.title.english ?? data.title.native,
    episodes: data.episodes,
    currentEp: epData,
    epId: showEp.id,
  };
  return info;
}

async function WatchPage({
  params: { id },
  searchParams: { epNum = "1" },
}: Props) {
  console.log(`AnimeId is: ${id}, epNum: ${epNum}`);
  const data = await getPageData(id, +epNum);
  const { currentEp, name: animeName, episodes, epId } = data;
  episodes.reverse();

  return (
    <section className="py-3">
      <h1 className="text-2xl font-bold">{animeName}</h1>
      {/* Menu */}
      <div className="flex justify-between bg-lightjetblack px-5 py-2">
        <p>{`EP.${epNum}`}</p>
        <a
          href={currentEp.download}
          className="no-underline hover:text-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>

      {/* video */}
      <iframe
        src={currentEp.headers.Referer}
        className="my-3 aspect-video w-full"
        id="myVid"
      ></iframe>

      {/* Anime info page */}
      <Link
        href={`/info/${id}`}
        className="my-4 bg-gold p-2 text-black no-underline font-bold rounded-md"
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
