"use client";

import { useSearchParams } from "next/navigation";
import { Season } from "@/utils/Anilist/types";
import { useEffect, useState } from "react";
import { AdvancedSearch } from "@/types/Anilist/AdvancedAnimeSearch";
import SearchLoading from "./loading";
import AnimeContainer from "@/components/AnimeContainer";

function SearchPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Record<string, string>>({});
  const [content, setContent] = useState<AdvancedSearch | "loading">("loading");

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
    const loadData = async () => {
      const strParams = new URLSearchParams(params).toString();
      const url = `https://consum-net-api.vercel.app/meta/anilist/advanced-search?${strParams}`;
      console.log(url)
      const response = await fetch(url);
      const data: AdvancedSearch = await response.json();
      setContent(data);
    };
    loadData();
  }, [params]);

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
          <AnimeContainer content={content.results} contentType="card" />
        </>
      )}
    </div>
  );
}

export default SearchPage;
