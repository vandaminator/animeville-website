"use client";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import Loading from "./loading";
import Anilist from "@/utils/Anilist/Anilist";
import { Result as trendingResult } from "@/types/Anilist/Trending";
import { Result as epResult } from "@/types/Anilist/RecentEP";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [topData, setTopData] = useState() as topState;
  const [animeData, setAnimeData] = useState() as animeState;

  const appReducer = (state: AppState, action: AppAction): AppState => {
    let count = state.count;
    const type = action.type;

    if (type === "next") {
      count += count !== 4 ? 1 : -4
    }
    else if (type === "back") {
      count -= count !== 0 ? 1 : -4
    }

    return { ...state, count };
  };
  const [currentNum, dispatch] = useReducer(appReducer, { count: 0 });
  const [currentTop, setCurrentTop] = useState() as currentState;

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
    const animeDescription = document.getElementById("description")
    if (animeDescription && currentTop) {
      animeDescription.innerHTML = currentTop.description
    }
  }, [currentTop])

  const Next = () => dispatch({ type: "next" });
  const Back = () => dispatch({ type: "back" });

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {/* Top-anime */}
          {currentTop && (
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
                className="bg-lightjetblack bg-cover bg-no-repeat max-sm:w-[125px] max-sm:h-[200px]"
              />

              {/* animeinfo */}
              <div className="flex flex-col justify-between p-2 text-sm">
                <h1 className="mb-2 mt-1 font-bold text-2xl max-sm:text-lg">{currentTop.name}</h1>
                <div id="description" className="h-[145px] overflow-hidden max-sm:text-xs"></div>
                <div className="space-y-3">
                  <p className="my-2">{currentTop.genres.join(", ")}</p>
                  <a
                    href={`/watch/${currentTop.id}`}
                    className="my-3 rounded-md bg-gold p-2 text-black"
                  >
                    watch
                  </a>
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
                  <AiOutlineArrowLeft size={"24px"} onClick={Back} />
                  <AiOutlineArrowRight size={"24px"} onClick={Next} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
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

// Define the state type
interface AppState {
  count: number;
}

// Define the action type
type AppAction = { type: "next" | "back" };

interface currentAnime {
  name: string;
  description: string;
  img: string;
  genres: string[];
  id: string;
}

type currentState = [
  currentAnime | undefined,
  Dispatch<SetStateAction<currentAnime | undefined>>
];

export default Home;
