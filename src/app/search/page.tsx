"use client";

import { useSearchParams } from "next/navigation";
import { Season } from "@/utils/Anilist/types";
import { useEffect, useState } from "react";
import { AdvancedSearch, Result } from "@/types/Anilist/AdvancedAnimeSearch";
import SearchLoading from "./loading";
import AnimeContainer from "@/components/AnimeContainer";
import { AiOutlineArrowDown } from "react-icons/ai";

function SearchPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Record<string, string>>({});
  const [content, setContent] = useState<Result[] | "loading">("loading");
  const [appState, setAppState] = useState({ nextPage: 2, isLast: false });

  useEffect(() => {
    const newParams: Record<string, string> = {};

    const query = searchParams.get("query");
    if (query) newParams.query = query;

    const year = searchParams.get("year");
    if (year) newParams.year = year;

    const season = searchParams.get("season");
    if (season) {
      const pSeason = season as Season;
      newParams.season = pSeason;
    }

    const genres = searchParams.get("genres");
    if (genres) {
      newParams.genres = genres;
    }
    setParams(newParams);
  }, [searchParams]);

  useEffect(() => {
    setContent("loading");
    setAppState({ nextPage: 2, isLast: false });

    const loadData = async () => {
      const strParams = new URLSearchParams(params).toString();
      console.log(strParams)
      const url = `https://consum-net-api.vercel.app/meta/anilist/advanced-search?${strParams}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Search is unavaliable Today");
      const data: AdvancedSearch = await response.json();
      console.log(data)
      setAppState((prev) => ({ ...prev, isLast: !data.hasNextPage }));

      setContent(data.results);
    };
    loadData();
  }, [params]);

  const loadMore = async () => {
    const searchObj = { ...params, page: appState.nextPage.toString() };
    const strParams = new URLSearchParams(searchObj).toString();
    const url = `https://consum-net-api.vercel.app/meta/anilist/advanced-search?${strParams}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("failed to get next");
      const data: AdvancedSearch = await response.json();

      setContent((prev) => {
        if (prev === "loading") return data.results;
        return [...prev, ...data.results];
      });
      setAppState((prev) => ({
        nextPage: prev.nextPage + 1,
        isLast: !data.hasNextPage,
      }));
    } catch (err) {
      console.log(err);
      setAppState((prev) => ({ ...prev, isLast: true }));
    }
  };

  return (
    <div>
      {content === "loading" && <SearchLoading />}
      {content !== "loading" && (
        <>
          {params?.query && (
            <h1 className="text-xl text-gold">
              Search results for &quot; {params.query} &quot;
            </h1>
          )}
          <AnimeContainer content={content} contentType="card" />
          <div
            className="w-full cursor-pointer rounded-lg bg-lightjetblack/75 p-3 hover:bg-lightjetblack hover:text-gold active:bg-lightjetblack active:text-gold"
            style={{ display: appState.isLast ? "none" : "flex" }}
            onClick={loadMore}
          >
            <AiOutlineArrowDown size={"24px"} className="mx-auto" />
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
