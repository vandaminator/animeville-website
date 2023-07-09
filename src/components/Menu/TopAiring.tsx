import React from "react";
import { trendInfo } from ".";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";

function TopAiring({ number, image, name, id, rating, trailer }: trendInfo) {
  let showTrailer = false;
  if (trailer && trailer.site === "youtube") {
    showTrailer = true;
  }
  const useNumber = number <= 3 ? number : "other";
  return (
    <div className="flex gap-1 w-full">
      <div className={`topairing topairing${useNumber}`}>
        <p className="my-auto">{number}</p>
      </div>
      <Image
        src={image}
        width={400}
        height={900}
        alt="anime img"
        className="w-[90px] h-[130px]"
      />
      <div className="flex flex-col gap-3">
        <Link href={`/info/${id}`}>{name}</Link>
        <div className="flex items-center space-x-1">
          <AiFillStar size={18} className="text-gold" />{" "}
          {rating ? rating : "N/A"}
        </div>
        {showTrailer && (
          <div>
            <a
              className="w-full rounded-lg p-2 outline"
              href={`https://www.youtube.com/watch?v=${trailer.id}`}
              target="_blank"
            >
              Veiw Trailer
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopAiring;
