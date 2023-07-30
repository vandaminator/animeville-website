"use client";
import AnimeContainer from "@/components/AnimeContainer";
import { Ation, Trailer } from "@/types/Anilist/AnimeInfo";
import React, { useEffect, useState } from "react";

type Props = {
  description: string;
  relations: Ation[];
  recommendations: Ation[];
  trailer: Trailer | "none";
};

type menuNames = "Synopsis" | "Related" | "Similar" | "Trailer";

type Menu = {
  name: menuNames;
  content: React.JSX.Element;
}[];

function MainInfo({ description, recommendations, relations, trailer }: Props) {
  const simlarHtml = (
    <AnimeContainer content={recommendations} contentType="card" />
  );
  const relatedHtml = <AnimeContainer content={relations} contentType="card" />;
  const synopsisHtml = <p id="description"></p>;
  const MenuItems: Menu = [
    { name: "Synopsis", content: synopsisHtml },
    { name: "Related", content: relatedHtml },
    { name: "Similar", content: simlarHtml },
  ];
  if (trailer !== "none" && trailer.id && trailer.site === "youtube") {
    const trailerHtml = (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${trailer.id}`}
        allowFullScreen
      />
    );
    MenuItems.push({ name: "Trailer", content: trailerHtml });
  }

  const [activeMenu, setActiveMenu] = useState(MenuItems[0]);
  const changeMenu = (id: number) => setActiveMenu(MenuItems[id]);

  useEffect(() => {
    if (activeMenu.name === "Synopsis") {
      const descripElement = document.getElementById(
        "description"
      ) as HTMLElement;
      descripElement.innerHTML = description;
    }
  }, [activeMenu, description]);

  return (
    <div>
      <div className="my-2 flex gap-1">
        {MenuItems.map(({ name }, num) => (
          <button
            className={`border border-x-0 border-t-0 bg-lightjetblack px-2 py-1 ${
              name === activeMenu.name ? "border-gold" : "border-creamywhite"
            }`}
            onClick={() => changeMenu(num)}
            key={num}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="p-2">{activeMenu.content}</div>
    </div>
  );
}

export default MainInfo;
