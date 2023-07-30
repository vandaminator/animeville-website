"use client";
import { EndDateClass } from "@/types/Anilist/AnimeInfo";
import {BsChevronCompactDown, BsChevronCompactUp} from "react-icons/bs"
import { useState } from "react";

type Props = {
  rating: number;
  type: string;
  season: string;
  start: EndDateClass;
  totalEpisodes: number;
  currentEpisode: number;
  duration: number;
  status: string;
};

function OtherInfo({
  rating,
  type,
  season,
  start,
  duration,
  totalEpisodes,
  currentEpisode,
  status,
}: Props) {
  const { year } = start;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="text-creamywhite ">
      <button
        className="flex w-full items-center justify-center p-3 text-gold hover:bg-gold hover:text-black active:scale-75"
        onClick={toggleMenu}
      >
        {isOpen ? (<BsChevronCompactDown size={"18px"} />) : (<BsChevronCompactUp size={"18px"} />)}
        <p className="mx-2">Information</p>
      </button>

      {/* Info */}
      {isOpen && (
        <div className={""}>
          <p>Rating: {rating}</p>
          <p>Type: {type}</p>
          <p>Release: {year !== null ? `${year}-${season}` : season}</p>
          <p>Duration: {`${duration} minutes`}</p>
          <p>Episodes: {`${currentEpisode}/${totalEpisodes}`}</p>
          <p>Status: {status}</p>
        </div>
      )}
    </div>
  );
}

export default OtherInfo;
