"use client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Anilist from "@/utils/Anilist/Anilist";
import { Result as trendingResult } from "@/types/Anilist/Trending";
import { Result as epResult } from "@/types/Anilist/RecentEP";
import TopAnime from "@/components/Home-comps/TopAnime";
import Body from "@/components/Home-comps/Body";
import AdComp from "@/components/AdComp";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [topData, setTopData] = useState<trendingResult[] | undefined>();
  const [animeData, setAnimeData] = useState<epResult[] | "loading">("loading");

  useEffect(() => {
    const loadData = async () => {
      const anilist = new Anilist();
      const topReq = anilist.Trending();
      const animeReq = anilist.RecentEp();

      const [top, anime] = await Promise.all([topReq, animeReq])

      setTopData(top.results.slice(0, 10));
      setAnimeData(anime.results);

      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);


  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <TopAnime topData={topData} />
          <AdComp />
          <Body initial={animeData} />
        </>
      )}
    </>
  );
}

export default Home;
