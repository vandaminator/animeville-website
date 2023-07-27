import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useReducer, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { Result as trendingResult } from "@/types/Anilist/Trending";

function TopAnime({ topData }: Props) {
  const appReducer = (state: AppState, action: AppAction): AppState => {
    let count = state.count;
    const type = action.type;

    if (type === "next") {
      count += count !== 4 ? 1 : -4;
    } else if (type === "back") {
      count -= count !== 0 ? 1 : -4;
    }

    return { ...state, count };
  };

  const [currentNum, dispatch] = useReducer(appReducer, { count: 0 });
  const [currentTop, setCurrentTop] = useState<currentAnime>();

  const Next = () => dispatch({ type: "next" });
  const Back = () => dispatch({ type: "back" });

  useEffect(() => {
    if (topData) {
      const anime = topData[currentNum.count];
      const {
        id,
        image: img,
        description,
        genres,
        title: { userPreferred: name },
      } = anime;
      setCurrentTop({ id, img, description, name, genres });
    }
  }, [topData, currentNum]);

  useEffect(() => {
    const animeDescription = document.getElementById("description");
    if (animeDescription && currentTop) {
      animeDescription.innerHTML = currentTop.description;
    }
  }, [currentTop]);

  return (
    <>
      {currentTop && (
        <>
          <div
            className="flex h-[300px] w-full rounded-md bg-lightjetblack bg-cover bg-center bg-no-repeat text-creamywhite bg-blend-overlay max-sm:h-[200px]"
            style={{
              backgroundImage: `url(${currentTop.img})`,
            }}
          >
            <Image
              src={currentTop.img}
              alt="anime img"
              width={200}
              height={300}
              className="bg-lightjetblack bg-cover bg-no-repeat max-sm:h-[200px] max-sm:w-[125px]"
            />

            {/* animeinfo */}
            <div className="flex flex-col justify-between p-2 text-sm flex-grow">
              <h1 className="mb-2 mt-1 text-2xl font-bold max-sm:text-lg">
                {currentTop.name}
              </h1>
              <div
                id="description"
                className="h-[145px] overflow-hidden max-sm:text-xs"
              ></div>
              <div className="space-y-3">
                <p className="my-2">{currentTop.genres.join(", ")}</p>
                <Link
                  href={`/watch/${currentTop.id}`}
                  className="my-3 rounded-md bg-gold p-2 text-black"
                >
                  watch
                </Link>
              </div>
            </div>

            {/* top nav */}
            <div className="flex flex-col justify-evenly">
              <div className="space-y-3">
                {topData?.map((_value, index) => (
                  <div
                    key={index}
                    className={`h-3 w-3 rounded-full max-sm:h-2 max-sm:w-2 ${
                      index === currentNum.count ? "bg-nightblue" : "bg-gold"
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <AiOutlineArrowRight size={"24px"} onClick={Next} />
                <AiOutlineArrowLeft size={"24px"} onClick={Back} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Define the state type
interface AppState {
  count: number;
}

interface currentAnime {
  name: string;
  description: string;
  img: string;
  genres: string[];
  id: string;
}

// Define the action type
type AppAction = { type: "next" | "back" };

type Props = { topData: trendingResult[] | undefined };

export default TopAnime;
