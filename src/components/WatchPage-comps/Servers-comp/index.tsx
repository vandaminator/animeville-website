"use client";

import { useEffect, useState } from "react";

type Props = { epId: string };
type Data = { name: string; url: string }[];
type State = {
  Sub: Data;
  Dub?: Data;
};

function Servers({ epId }: Props) {
  const [epData, setEpData] = useState<State | "loading">("loading");
  
  const changeServer = (url: string) => {
    const vidFrame = document.getElementById("myVid") as HTMLIFrameElement;
    vidFrame.src = url;
  }

  useEffect(() => {
    const canDub = /-episode-\d+$/;
    const loadData = async () => {
      const response = await fetch(
        `https://consum-net-api.vercel.app/meta/anilist/servers/${epId}`
      );
      const subData: Data = await response.json();
      const newEpData: State = { Sub: subData };

      if (canDub.test(epId)) {
        const ep = epId.split("-episode-");
        const dubEp = ep.join("-dub-episode-");
        const dubResponse = await fetch(
          `https://consum-net-api.vercel.app/meta/anilist/servers/${dubEp}`
        );
        if (dubResponse.ok) {
          const dubData: Data = await dubResponse.json();
          newEpData["Dub"] = dubData;
        }
      }
      setEpData(newEpData);
    };

    loadData();
  }, [epId]);

  return (
    <>
      {epData !== "loading" && (
        <div className="my-4 bg-lightjetblack/60 p-3">
          <p className="text-xs">if video is not playing please try these</p>
          {/* Sub */}
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
