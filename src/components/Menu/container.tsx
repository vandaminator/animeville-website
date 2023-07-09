"use client";
import Link from "next/link";
import React from "react";
import { Season } from "@/utils/Anilist/types";
import { trendList } from ".";
import Loader from "../Loader";
import TopAiring from "./TopAiring";

export type genresType = {
  [key: string]: {
    checked: boolean;
  };
};

type MenuContainerProps = {
  genres: genresType;
  yearNumbers: number[];
  top: trendList | "loading";
};

function MenuContainer({ genres, yearNumbers, top }: MenuContainerProps) {
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

  return (
    <aside>
      {/* Top side */}
      <div className="flex justify-between bg-lightjetblack p-3">
        <button className="border-none bg-inherit font-semibold text-creamywhite outline-none">
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
      <div className="flex items-center justify-center gap-3 p-3">
        <Select name="Season" values={seasonOptions} />
        <Select name="Year" values={yearOptions} />
        <button className="my-auto rounded-md border border-gold p-2 font-bold text-gold hover:bg-gold hover:text-black">
          GO
        </button>
      </div>

      {/* Genres */}
      <section className="flex flex-col justify-center bg-lightjetblack p-2">
        <h1 className="mx-auto mb-1 text-lg font-bold">Genres</h1>
        <div className="grid grid-cols-2">
          {genresArray.map((gen, index) => (
            <Genres name={gen} cheacked={genres[gen].checked} key={index} />
          ))}
        </div>
      </section>

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

type GenresProps = { name: string; cheacked: boolean };

function Genres({ name, cheacked }: GenresProps) {
  return (
    <div className="flex gap-1 p-1">
      <input type="checkbox" name={`${name}-check`} id={`${name}-check`} />
      <p className="text-creamywhite">{name}</p>
    </div>
  );
}

type SelectProps = { name: string; values: React.JSX.Element[] };

function Select({ name, values }: SelectProps) {
  const nameLowerCase = name.toLowerCase();
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={`${nameLowerCase}-options`}
        className="font-semibold text-creamywhite"
      >
        {name}
      </label>
      <select name={`${nameLowerCase}-options`} id={`${nameLowerCase}-options`}>
        <option value="none"></option>
        {values}
      </select>
    </div>
  );
}

export default MenuContainer;
