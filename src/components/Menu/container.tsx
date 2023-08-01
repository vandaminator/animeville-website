"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Season } from "@/utils/Anilist/types";
import { trendList } from ".";
import Loader from "../Loader";
import TopAiring from "./TopAiring";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type genresType = {
  [key: string]: {
    checked: boolean;
  };
};

type MenuContainerProps = {
  genres: genresType;
  yearNumbers: number[];
  top: trendList | "loading";
  currentSeason: Season;
  currentYear: number;
};

function MenuContainer({
  genres,
  yearNumbers,
  top,
  currentSeason,
  currentYear,
}: MenuContainerProps) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [crSeason, setSeaason] = useState<string>(currentSeason);
  const [crYear, setYear] = useState<string>(currentYear.toString());

  const genresArray = Object.keys(genres);
  const seasonOptions = Object.values(Season).map((season, index) => (
    <option value={season} key={index}>
      {season}
    </option>
  ));
  const yearOptions = yearNumbers.map((year, index) => (
    <option value={year} key={index}>
      {year}
    </option>
  ));

  const toggleAirSched = () =>
    document.getElementById("air-comp")?.classList.toggle("open");

  const handleGo = () => {
    router.push(`/search?year=${crYear}&season=${crSeason}`);
  };
  const handleGenre = (name: string) => {
    const genreName = name.toLowerCase()
    const inSearchPath = pathName === "/search";
    const hasGenres = searchParams.has("genres");
    console.log(inSearchPath)

    if (inSearchPath && hasGenres) {
      const genres = searchParams.get("genres") as string;
      const arrayGenres = genres.split(",");

      if (genreName in arrayGenres) {
        const filterdGenres = arrayGenres
          .filter((genre) => genre !== genreName)
          .join(",");
        const search = new URLSearchParams({
          genres: filterdGenres,
        }).toString();
        const url = "/search?" + search;
        router.push(url);
      } else {
        arrayGenres.push(genreName);
        const newGenres = arrayGenres.join(",");
        const search = new URLSearchParams({ genres: newGenres }).toString();
        const url = "/search?" + search;
        router.push(url);
      }
    } else {
      const url = "/search?genres=" + genreName;
      router.push(url)
    }
  };

  return (
    <aside>
      {/* Top side */}
      <div className="flex justify-between bg-lightjetblack p-3">
        <button
          onClick={toggleAirSched}
          className="border-none bg-inherit font-semibold text-creamywhite outline-none"
        >
          Schedule
        </button>
        <Link
          className="border-none bg-inherit font-semibold text-creamywhite no-underline outline-none"
          href="/random"
        >
          Random
        </Link>
      </div>

      {/* Season and Year */}
      <div className="flex items-center justify-center gap-3 bg-jetblack p-3">
        <Select
          name="season"
          values={seasonOptions}
          currentValue={crSeason}
          changer={setSeaason}
        />
        <Select
          name="year"
          values={yearOptions}
          currentValue={crYear}
          changer={setYear}
        />
        <button
          className="my-auto rounded-md border border-gold p-2 font-bold text-gold hover:bg-gold hover:text-black"
          onClick={handleGo}
        >
          GO
        </button>
      </div>

      {/* Genres */}
      {/* <section className="flex flex-col justify-center bg-lightjetblack p-2">
        <h1 className="mx-auto mb-1 text-lg font-bold">Genres</h1>
        <div className="grid grid-cols-2">
          {genresArray.map((gen, index) => (
            <Genres
              name={gen}
              cheacked={genres[gen].checked}
              handleGenre={handleGenre}
              key={index}
            />
          ))}
        </div>
      </section> */}

      {/* Top Airing */}
      <section className="flex flex-col justify-center bg-lightjetblack p-2">
        <h1 className="mx-auto mb-3 text-lg font-bold">Top Airing</h1>
        <div className="flex flex-col items-center gap-1">
          {top === "loading" ? (
            <Loader />
          ) : (
            top.map((t, index) => <TopAiring {...t} key={index} />)
          )}
        </div>
      </section>
    </aside>
  );
}

type GenresProps = {
  name: string;
  cheacked: boolean;
  handleGenre: (name: string) => void;
};

function Genres({ name, handleGenre }: GenresProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    handleGenre(value);
  };
  return (
    <div className="flex gap-1 p-1">
      <input
        type="checkbox"
        name={`${name}-check`}
        id={`${name}-check`}
        value={name}
        onChange={handleChange}
      />
      <p className="text-creamywhite">{name}</p>
    </div>
  );
}

type SelectProps = {
  name: string;
  values: React.JSX.Element[];
  currentValue: string;
  changer: React.Dispatch<React.SetStateAction<string>>;
};

function Select({ name, values, currentValue, changer }: SelectProps) {
  const nameLowerCase = name.toLowerCase();
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={`${nameLowerCase}-options`}
        className="font-semibold text-creamywhite"
      >
        {name}
      </label>
      <select
        name={`${nameLowerCase}-options`}
        id={`${nameLowerCase}-options`}
        value={currentValue}
        onChange={(e) => changer(e.currentTarget.value)}
      >
        {values}
      </select>
    </div>
  );
}

export default MenuContainer;
