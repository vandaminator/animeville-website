import React, { useEffect, useState } from "react";
import Anilist from "@/utils/Anilist/Anilist";
import BodyLoading from "./loading";
import { Result as trendingResult } from "@/types/Anilist/Trending";
import { Result as searchResult } from "@/types/Anilist/AdvancedAnimeSearch";
import { Result as epResult } from "@/types/Anilist/RecentEP";
import AnimeContainer from "@/components/AnimeContainer";
import { AiOutlineArrowDown } from "react-icons/ai";

type menuNames = "RecentEp" | "Trending" | "Popular" | "Movie";
type itemMenu = {
  id: number;
  title: menuNames;
  type: "ep" | "card";
};
type Result = (epResult | trendingResult | searchResult)[] | "loading";

type Props = {
  initial: Result;
};

const anilist = new Anilist();
const menuMoreMethods = {
  RecentEp: anilist.RecentEp,
  Popular: anilist.Popular,
  Trending: anilist.Trending,
  Movie: anilist.Movie,
};

function Body({ initial }: Props) {
  const menuItems: itemMenu[] = [
    { id: 1, title: "RecentEp", type: "ep" },
    { id: 2, title: "Trending", type: "card" },
    { id: 3, title: "Popular", type: "card" },
    { id: 4, title: "Movie", type: "card" },
  ];

  const [activeMenu, setActiveMenu] = useState<itemMenu>(menuItems[0]);
  const [content, setContent] = useState<Result>(initial);
  const [appState, setAppState] = useState({ nextPage: 2, isLast: false });

  const handleMenuClick = (menuItem: itemMenu) => {
    setAppState({ nextPage: 2, isLast: false });
    setActiveMenu(menuItem);
    setContent("loading");
    loadContent(menuItem.title);
  };

  const loadContent = async (type: menuNames, page = 1, isAdd = false) => {
    const response = await menuMoreMethods[type]({ page, perPage: 24 });

    if (isAdd)
      setContent((prev) =>
        prev === "loading" ? response.results : [...prev, ...response.results]
      );
    else setContent(response.results);
    setAppState((prevState) => ({
      ...prevState,
      isLast: !response.hasNextPage,
    }));
  };

  const handleMore = () => {
    if (!appState.isLast) {
      const nextPage = appState.nextPage + 1;
      setAppState((prevState) => ({ ...prevState, nextPage }));
      loadContent(activeMenu.title, nextPage, true);
    }
  };

  useEffect(() => {
    loadContent(activeMenu.title);
  }, [activeMenu.title]);

  return (
    <div className="my-3">
      <div className="flex gap-x-2">
        {menuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            className={`border border-x-0 border-t-0 bg-lightjetblack/80 font-bold ${
              activeMenu.id === menuItem.id
                ? "border-gold bg-lightjetblack"
                : "border-silver"
            }`}
            onClick={() => handleMenuClick(menuItem)}
          >
            {menuItem.title}
          </div>
        ))}
      </div>
      <>
        {content === "loading" && <BodyLoading />}
        {content !== "loading" && (
          <>
            <AnimeContainer content={content} contentType={activeMenu.type} />
            <div
              className="w-full cursor-pointer rounded-lg bg-lightjetblack/75 p-3 hover:bg-lightjetblack hover:text-gold active:bg-lightjetblack active:text-gold"
              onClick={handleMore}
            >
              <AiOutlineArrowDown size={"24px"} className="mx-auto" />
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default Body;
