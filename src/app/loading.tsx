function Loading() {
  return (
    <div className="animate-pulse space-y-2 py-3">
      {/* Top-anime */}
      <div className="h-[200px] w-full rounded-md bg-lightjetblack"></div>

      <section className="w-full border border-lightjetblack">
        {/* Menu */}
        <div className="flex w-full gap-2">
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
        </div>
        <br className="text-creamywhite" />

        {/* Anime */}
        <div className="grid grid-cols-3 gap-2 border border-lightjetblack">
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
          <div className="h-[400px] bg-lightjetblack"></div>
        </div>
      </section>
    </div>
  );
}

export default Loading;
