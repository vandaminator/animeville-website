"use client"
import React, { useState } from "react";
import { trendInfo } from ".";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Modal from "../Modal";

function TopAiring({ number, image, name, id, rating, trailer }: trendInfo) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const onOpen = () => setIsOpen(true)
  
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
        {showTrailer && (<div className="max-lg:hidden">
          <button onClick={onOpen} className="p-2 rounded border border-creamywhite">View Trailer</button>
          <Modal onClose={onClose} isOpen={isOpen}>
            <iframe src={`https://www.youtube.com/embed/${trailer.id}`} className="aspect-video w-[500px]" allowFullScreen></iframe>
          </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopAiring;
