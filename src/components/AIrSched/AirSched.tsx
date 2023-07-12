"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

import Anilist from "@/utils/Anilist/Anilist";
import Loader from "../Loader";

type dataInfo = {
  [key: string]:
    | {
        name: string;
        time: string;
        id: string;
      }[]
    | undefined;
};
type dataProps = dataInfo | "loading";
type dataState = [dataProps, Dispatch<SetStateAction<dataProps>>];

type listState = [
  JSX.Element[] | "none",
  Dispatch<SetStateAction<JSX.Element[] | "none">>
];

function AirSched() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [data, setData] = useState("loading") as dataState;
  const [list, setList] = useState("none") as listState;
  const [isClient, setClient] = useState(false);

  const toggleAirSched = () =>
    document.getElementById("air-comp")?.classList.toggle("open");

  useEffect(() => {
    setClient(true);
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    new Anilist().AirSchedule().then((info) => setData(info));

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (data !== "loading") {
      const days = Object.keys(data);
      const time = days.map((day, index) => {
        const dayData = data[day];
        let animes: { name: string; time: string; id: string }[] = [];
        if (dayData !== undefined) {
          animes = dayData;
        }
        return <Day day={day} animes={animes} key={index} />;
      });
      setList(time);
    }
  }, [data]);

  return (
    <aside className="bg-lightjetblack">
      <IoMdClose
        size={32}
        className="cursor-pointer text-creamywhite hover:text-gold my-3"
        onClick={toggleAirSched}
      />
      <section className="h-full w-full bg-jetblack">
        <h1 className="flex w-full justify-center text-2xl font-bold text-creamywhite">
          {isClient ? time : "Time"}
        </h1>
        <div className="space-y-3">
          {data === "loading" && <Loader />}
          {list !== "none" && list}
        </div>
      </section>
    </aside>
  );
}

type dayProps = {
  day: string;
  animes: {
    name: string;
    time: string;
    id: string;
  }[];
};

function Day({ day, animes }: dayProps) {
  return (
    <section className="space-y-3 bg-lightjetblack p-1 text-creamywhite">
      <h1 className=" mx-auto text-xl font-bold text-gold underline decoration-deepred decoration-4">
        {day}
      </h1>
      <div className="space-y-1 p-1">
        {animes.map(({ name, time, id }, index) => (
          <div
            key={index}
            className="flex justify-between text-sm font-semibold"
          >
            <Link
              href={`/info/${id}`}
              className="w-[70%] no-underline hover:text-gold hover:underline"
            >
              {name}
            </Link>
            <p className="text-gold">{time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AirSched;
