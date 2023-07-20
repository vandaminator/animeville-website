"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "./loading";
import Anilist from "@/utils/Anilist/Anilist";
import { Result as trendingResult } from "@/types/Anilist/Trending";
import { Result as epResult } from "@/types/Anilist/RecentEP";
import TopAnime from "@/components/Home-comps/TopAnime";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [topData, setTopData] = useState() as topState;
  const [animeData, setAnimeData] = useState() as animeState;

  useEffect(() => {
    const loadData = async () => {
      const anilist = new Anilist();
      const top = (await anilist.Trending()).results.slice(0, 5);
      const anime = (await anilist.RecentEp()).results;

      setTopData(top);
      setAnimeData(anime);

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <TopAnime topData={topData} />}
    </>
  );
}

type topState = [
  trendingResult[] | undefined,
  Dispatch<SetStateAction<trendingResult[] | undefined>>
];

type animeState = [
  epResult[] | undefined,
  Dispatch<SetStateAction<epResult[] | undefined>>
];

export default Home;
