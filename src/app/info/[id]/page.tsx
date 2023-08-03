import { Ation, Info, Trailer } from "@/types/Anilist/AnimeInfo";
import Link from "next/link";
import Image from "next/image";
import OtherInfo from "@/components/InfoPage-comps/OtherInfo";
import MainInfo from "@/components/InfoPage-comps/MainInfo";

type Props = { params: { id: string } };
type main = {
  description: string;
  recommendations: Ation[];
  trailer: "none" | Trailer;
  relations: Ation[];
};

async function getAnimeInfo(id: string) {
  const response = await fetch(
    `https://consum-net-api.vercel.app/meta/anilist/data/${id}`
  );
  const data: Info = await response.json();
  return data;
}

async function InfoPage({ params: { id } }: Props) {
  const data = await getAnimeInfo(id);
  const {
    title,
    cover: animeCover,
    image,
    id: animeId,
    rating,
    type,
    season,
    startDate: start,
    duration,
    totalEpisodes,
    currentEpisode,
    status,
    description,
    relations,
    recommendations,
    trailer = "none",
  } = data;

  const otherInfo = {
    rating,
    type,
    season,
    startDate: start,
    duration,
    totalEpisodes,
    currentEpisode,
    status,
    start,
  };
  const tvRelations = relations.filter(
    (anime) =>
      anime.type === "TV" ||
      anime.type === "OVA" ||
      anime.type === "MOVIE" ||
      anime.type === "SPECIAL"
  );
  const mainInfo: main = {
    description,
    recommendations,
    trailer,
    relations: tvRelations,
  };

  const mainName = title.romaji ?? title.native;
  const animeNames = [title.english, title.native, title.romaji].filter(
    (value) => value !== null
  );

  return (
    <section>
      {/* Top Banner */}
      <div
        className="flex h-[100px] w-full items-end justify-end bg-gradient-to-t from-lightjetblack to-gold bg-cover bg-center bg-no-repeat bg-blend-overlay lg:h-[200px]"
        style={{ backgroundImage: `url(${animeCover})` }}
      >
        <Link
          href={`/watch/${animeId}?title=${title.romaji}`}
          className="bg-gold p-2 hover:bg-transparent hover:text-gold hover:outline hover:outline-gold"
        >
          Watch
        </Link>
      </div>

      {/* All */}
      <div className="lg:flex">
        {/* Info Pane */}
        <div className="lg:w-[200px]">
          {/* Main Banner */}
          <section
            className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-creamywhite to-lightjetblack py-2 lg:w-[200px] p-2"
          >
            <h1 className="my-2 font-bold">{mainName}</h1>
            <Image
              src={image}
              className="my-2 w-2/5 lg:w-full"
              width={200}
              height={450}
              alt="anime image"
            />
            <div className="w-full p-2 text-black">
              {animeNames.map((name, index) => {
                if (name === null) return;
                return <p key={index}>{name}</p>;
              })}
            </div>
          </section>

          {/* Other info */}
          <OtherInfo {...otherInfo} />
        </div>

        {/* Main info */}
        <div className="">
          <MainInfo {...mainInfo} />
        </div>
      </div>
    </section>
  );
}

// {/* <section className="text-creamywhite">
//       {/* Top Banner */}
//       <div className={`flex h-[200px] w-full items-end justify-end`}>
//         <Link
//           href={`/watch/${animeId}`}
//           className="bg-gold p-2 hover:bg-transparent hover:text-gold hover:outline hover:outline-gold"
//         >
//           Watch
//         </Link>
//       </div>

//       {/* All */}
//       <div className="lg:flex">
//         {/* Info Pane */}
//         <div className="">
//           {/* Main Banner */}
//           <section
//             className={`w-full bg-cover bg-center bg-no-repeat py-2 bg-blend-overlay`}
//           >
//             <h1 className="my-2 font-bold">{mainName}</h1>
//             <Image
//               src={image}
//               className="my-2 w-2/5"
//               width={200}
//               height={450}
//               alt="anime image"
//             />
//             <div className="w-full p-2">
//               {animeNames.map((name, index) => {
//                 if (name === null) return;
//                 return <p key={index}>{name}</p>;
//               })}
//             </div>
//           </section>

//           {/* Other info */}
//           <OtherInfo {...otherInfo} />
//         </div>

//         {/* Main info */}
//         <div className="">
//           <MainInfo {...mainInfo} />
//         </div>
//       </div>
//     </section> */}

export default InfoPage;
