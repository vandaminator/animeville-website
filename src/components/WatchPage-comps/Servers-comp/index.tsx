"use client";

import { serversUrl as aniUrl } from "@/utils/Anilist/Urls";
import { serversUrl as gogoUrl } from "@/utils/GogoAnime/Urls";
import { useEffect, useState } from "react";

type Props = { epId: string; canGogo: boolean };
type Data = { name: string; url: string }[];
type State = {
  Sub?: Data;
  Dub?: Data;
};

function Servers({ epId, canGogo }: Props) {
  const [epData, setEpData] = useState<State | "loading">("loading");

  const changeServer = (url: string) => {
    const vidFrame = document.getElementById("myVid") as HTMLIFrameElement;
    vidFrame.src = url;
  };

  useEffect(() => {
    const loadData = async () => {
      let newEpData: State;

      if (canGogo) {
        // getting sub from GogoAnime
        const gogoResponse = await fetch(gogoUrl(epId));
        if (gogoResponse.ok) {
          const subData: Data = await gogoResponse.json();
          newEpData = { Sub: subData };

          // getting dub
          const dubEp = epId.split("-episode-").join("-dub-episode-");
          const gogoDubRes = await fetch(gogoUrl(dubEp));

          if (gogoDubRes.ok) {
            const dubData: Data = await gogoDubRes.json();
            newEpData.Dub = dubData;
            // this will have dub
            setEpData(newEpData);
          } else setEpData(newEpData); // this wont have dub
        } else {
          // if not ok then we cant get dub so
          // we use Anilist
          const aniResponse = await fetch(aniUrl(epId));
          if (aniResponse.ok) {
            const subData: Data = await aniResponse.json();
            newEpData = { Sub: subData };
          }
        }
      } else {
        const aniResponse = await fetch(aniUrl(epId));
        if (aniResponse.ok) {
          const subData: Data = await aniResponse.json();
          newEpData = { Sub: subData };
          setEpData(newEpData);
        }
      }
    };

    loadData();
  }, [canGogo, epId]);

  // can show if is not data is loading  or     both are not nothing
  const canShow = !(epData === "loading" || !epData.Sub && !epData.Dub);
  return (
    <>
      {canShow && (
        <div className="my-4 bg-lightjetblack/60 p-3">
          <p className="text-xs">if video is not playing please try these</p>
          {/* Sub */}
          {epData.Sub !== undefined && (
            <div className="my-3 flex flex-wrap items-center gap-2">
              <p className="font-bold">Sub: </p>
              {epData.Sub.map(({ name, url }, num) => (
                <button
                  className="rounded-lg bg-jetblack p-2 text-creamywhite"
                  key={num}
                  onClick={() => changeServer(url)}
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* Dub */}
          {epData.Dub !== undefined && (
            <div className="my-3 flex flex-wrap items-center gap-2">
              <p className="font-bold">Dub: </p>
              {epData.Dub.map(({ name, url }, num) => (
                <button
                  className="rounded-lg bg-jetblack p-2 text-creamywhite"
                  key={num}
                  onClick={() => changeServer(url)}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Servers;
