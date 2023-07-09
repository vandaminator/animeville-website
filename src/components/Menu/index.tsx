"use client";
import Anilist from "@/utils/Anilist/Anilist";
import MenuContainer, { genresType } from "./container";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Trailer } from "@/types/Anilist/Trending";

const genres: genresType = {
  Action: { checked: false },
  Adventure: { checked: false },
  Cars: { checked: false },
  Comedy: { checked: false },
  Drama: { checked: false },
  Fantasy: { checked: false },
  Horror: { checked: false },
  "Mahou Shoujo": { checked: false },
  Mecha: { checked: false },
  Music: { checked: false },
  Mystery: { checked: false },
  Psychological: { checked: false },
  Romance: { checked: false },
  "Sci-Fi": { checked: false },
  "Slice of Life": { checked: false },
  Sports: { checked: false },
  Supernatural: { checked: false },
  Thriller: { checked: false },
};

export type trendInfo = {
  id: string;
  image: string;
  name: string;
  rating: number | null;
  trailer: Trailer;
  number: number;
};

export type trendList = trendInfo[];

type topState = [
  trendList | "loading",
  Dispatch<SetStateAction<trendList | "loading">>
];

function Menu() {
  const yearNumbers: number[] = [];
  const startYear = new Date().getFullYear() + 1;
  const endYear = 1980;

  for (let year = startYear; year > endYear; year--) {
    yearNumbers.push(year);
  }
  
  useEffect(() => {
    new Anilist().Trending().then((value) => {
      const results = value.results.slice(0, 5);
      const muted = results.map((result, number) => {
        const {
          id,
          title: { userPreferred: name },
          image,
          trailer,
          rating,
        } = result;
        return {
          id,
          name: name,
          image,
          rating: rating,
          trailer,
          number: number + 1,
        };
      });
      setTop(muted);
    });
  }, []);

  const [top, setTop] = useState("loading") as topState;
  return <MenuContainer genres={genres} yearNumbers={yearNumbers} top={top} />;
}

export default Menu;
