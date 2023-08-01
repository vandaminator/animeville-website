"use client";
import Anilist from "@/utils/Anilist/Anilist";
import MenuContainer, { genresType } from "./container";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Trailer } from "@/types/Anilist/Trending";
import { Genre, Season } from "@/utils/Anilist/types";

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

function Menu() {
  const [top, setTop] = useState<trendList | "loading">("loading");

  const yearNumbers: number[] = [];
  const date = new Date();
  const startYear = date.getFullYear() + 1;
  const endYear = 1980;

  const seasonMapping = (monthNum: number) => {
    // January starts in 0

    if (monthNum in [11, 0, 1]) return Season.WINTER;
    else if (monthNum in [2, 3, 4]) return Season.SPRING;
    else if (monthNum in [5, 6, 7]) return Season.SUMMER;
    else if (monthNum in [8, 9, 10]) return Season.FALL;
    else return Season.FALL;
  };

  const season = seasonMapping(date.getMonth());

  for (let year = startYear; year > endYear; year--) {
    yearNumbers.push(year);
  }

  useEffect(() => {
    new Anilist().Trending().then((value) => {
      const results = value.results.slice(0, 5);
      const newTop = results.map((result, number) => {
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
      setTop(newTop);
    });
  }, []);

  return (
    <MenuContainer
      genres={genres}
      yearNumbers={yearNumbers}
      top={top}
      currentSeason={season}
      currentYear={startYear - 1}
    />
  );
}

export default Menu;
