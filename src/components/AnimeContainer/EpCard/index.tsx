import Image from "next/image";
import React from "react";

type Props = {
  img: string;
  title: string;
  epNum: number;
  epId: string;
};

function EpCard({ img, title, epId, epNum }: Props) {
  return (
    <li className="bg-lightjetblack">
      <a href={`#`} className="text-creamywhite bg-lightjetblack">
        <Image
          src={img}
          alt="animeImage"
          className="h-3/5 w-full"
          width={200}
          height={450}
        />
        <div className="p-3">
          <p className="font-semibold text-xs">{title}</p>
          <p className="text-creamywhite/40">{`EP ${epNum}`}</p>
        </div>
      </a>
    </li>
  );
}

export default EpCard;
