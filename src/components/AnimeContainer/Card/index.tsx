import Image from "next/image";
import React from "react";

type Props = {
  img: string;
  title: string;
  type: string;
  id: string;
};

function Card({ img, title, id, type }: Props) {
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
          <p className="text-creamywhite/40">{type}</p>
        </div>
      </a>
    </li>
  );
}

export default Card;
