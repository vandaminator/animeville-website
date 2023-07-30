function InfoLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-[200px] w-full bg-gray-500"></div>

      <div className="lg:flex">
        {/* Banner */}
        <div className="h-[500px] w-full bg-black"></div>

        {/* Tab */}
        <div className="flex w-full gap-2">
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
          <div className="h-[24px] w-1/6 bg-lightjetblack"></div>
        </div>

        {/* Current Items */}
        <div className="h-[900px] w-full"></div>
      </div>
    </div>
  );
}

export default InfoLoading;
