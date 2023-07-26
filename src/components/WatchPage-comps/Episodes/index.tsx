"use client";

import Link from "next/link";
import { Episode } from "@/types/Anilist/AnimeInfo";

type Props = { episodes: Episode[]; epNum: number; id: string };

function Episodes({ episodes, epNum, id }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold mt-3">Episodes</h1>
      <div className="grid-cols-ep grid list-none gap-3 text-black">
        {episodes.map((ep, num) => (
          <Link
            href={`/watch/${id}?epNum=${ep.number}`}
            className={`ep ${epNum === ep.number ? "current" : ""}`}
            key={num}
          >
            {ep.number}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Episodes;
