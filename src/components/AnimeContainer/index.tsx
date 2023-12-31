import React, { useEffect, useState } from "react";

import { Result as trendingResult } from "@/types/Anilist/Trending";
import { Result as searchResult } from "@/types/Anilist/AdvancedAnimeSearch";
import { Result as epResult } from "@/types/Anilist/RecentEP";
import EpCard from "./EpCard";
import Card from "./Card";
import { Ation } from "@/types/Anilist/AnimeInfo";

type Props = {
  contentType: "ep" | "card";
  content: (epResult | trendingResult | searchResult | Ation)[];
};

function AnimeContainer({ content, contentType }: Props) {
  const [showContent, setShowContent] = useState<React.JSX.Element[]>();

  useEffect(() => {
    if(!content) return;
    let newShow: JSX.Element[] = [];

    if (contentType === "ep") {
      const currentContent = content as epResult[];
      newShow = currentContent.map(
        (
          { image, title: { userPreferred }, episodeId, episodeNumber, id },
          num
        ) => (
          <EpCard
            id={id}
            img={image}
            title={userPreferred}
            epId={episodeId}
            epNum={episodeNumber}
            key={num}
          />
        )
      );
    } else if (contentType === "card") {
      const currentContent = content as (trendingResult | searchResult)[];
      newShow = currentContent.map(
        ({ image, title: { userPreferred }, id, type }, num) => (
          <Card
            img={image}
            title={userPreferred}
            id={id}
            type={type}
            key={num}
          />
        )
      );
    }

    setShowContent(newShow);
  }, [contentType, content]);

  return (
    <ul className="my-2 grid list-none grid-cols-3 gap-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {showContent}
    </ul>
  );
}

export default AnimeContainer;
