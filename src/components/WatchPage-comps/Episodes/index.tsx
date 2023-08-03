"use client";

import Link from "next/link";

type Props = { episodes: number[]; epNum: number; id: string; title: string };

function Episodes({ episodes, epNum, id, title }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold mt-3">Episodes</h1>
      <div className="grid-cols-ep grid list-none gap-3 text-black">
        {episodes.map((ep, num) => (
          <Link
            href={`/watch/${id}?epNum=${ep}&title=${title}`}
            className={`ep ${epNum === ep ? "current" : ""}`}
            key={num}
          >
            {ep}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Episodes;
