import axios from "axios";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// url: /api/schedule

export const GET = async () => {
  const response = await fetch(
    "https://www.livechart.me/schedule/tv?layout=compact&titles=english"
  );
  const data = await response.text();
  const $ = cheerio.load(data);
  const dateNow = Date.now();

  const weekDays = $(".schedule-heading")
    .toArray()
    .map((s) => s.attribs.id);

  const daysInfo = weekDays.map((value, index) => {
    const dayChart = $(".chart").eq(index);
    // console.log(dayChart.text())
    const numItems = dayChart.find(".schedule-card").length;
    // console.log(dayChart.find(".schedule-card").text())
    const data = [];

    for (let i = 0; i < numItems; i++) {
      const card = dayChart.find(".schedule-card").eq(i);
      const name = card.prop("data-title");
      const dateAiring = +card.find("time").prop("data-timestamp");

      data.push({ name: name, airing: dateAiring });
    }

    return data;
  });

  const sortedInfo = daysInfo.flat().sort((a, b) => {
    if (a.airing < b.airing) return -1;
    else if (a.airing > b.airing) return 1;
    return 0;
  });

  const info: {
    [key: string]: { name: string; time: string }[] | undefined;
  } = {};
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  sortedInfo.forEach((item) => {
    const date = new Date(item.airing * 1000);

    const itemHours = date.getHours();
    const itemMinutes = date.getMinutes();
    const day = weekDay[date.getDay()];
    const itemDate = date.getDate();

    const dateName = `${day} ${itemDate}`;
    const time = `${itemHours} : ${itemMinutes}`;

    const obj = { name: item.name, time };

    if (info[dateName] === undefined) {
        info[dateName] = [obj];
    } else {
        info[dateName]?.push(obj)
    }
  });

  return NextResponse.json({ date: dateNow, info });
};
