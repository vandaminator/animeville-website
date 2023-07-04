import axios from "axios";
import { GenericProps, SearchProps } from "./types";
import { AdvancedSearch } from "@/types/Anilist/AdvancedAnimeSearch";
import { Info } from "@/types/Anilist/AnimeInfo";
import { StreamingLinks } from "@/types/Anilist/AnimeStreamingLlinks";
import { Trending } from "@/types/Anilist/Trending";
import { AiringSched } from "@/types/Anilist/Airing-sched";
import { Random } from "@/types/Anilist/Random";
import { Popular } from "@/types/Anilist/Popular";

class Anilist {
  url = `${process.env.API}/meta/anilist`;

  async Search(data: SearchProps = {}): Promise<AdvancedSearch> {
    const searchUrl = `${this.url}/advanced-search`;
    const response = await axios(searchUrl, { params: data });
    const info = await response.data;
    return info;
  }

  async Info(animeId: number): Promise<Info> {
    const infoUrl = `${this.url}/info/${animeId}`;
    const response = await axios(infoUrl);
    const info = await response.data;
    return info;
  }

  async StreamingLinks(episodeId: string): Promise<StreamingLinks> {
    const episodeUrl = `${this.url}/watch/${episodeId}`;
    const response = await axios(episodeUrl);
    const info = await response.data;
    return info;
  }

  async RecentEp(data: GenericProps = {}) {
    const recentUrl = `${this.url}/recent`;
    const response = await axios(recentUrl, { params: data });
    const info = await response.data;
    return info;
  }

  async Trending(data: GenericProps = {}): Promise<Trending> {
    const trendingUrl = `${this.url}/trending`;
    const response = await axios(trendingUrl, { params: data });
    const info = await response.data;
    return info;
  }

  async Popular(data: GenericProps = {}): Promise<Popular> {
    const popularUrl = `${this.url}/popular`;
    const response = await axios(popularUrl, { params: data });
    const info = await response.data;
    return info;
  }

  async AirSchedule(
    data: GenericProps = {}
  ): Promise<{ [key: string]: { name: string; time: string }[] | undefined }> {
    const weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const scheduleUrl = `${this.url}/airing-schedule`;
    const params = { ...data, notYetAired: true, perPage: 40 };
    const response = await axios(scheduleUrl, { params });

    const info: AiringSched = await response.data;
    const results = info.results;

    let hasNextPage = info.hasNextPage;
    let page = 2;
    while (hasNextPage) {
      const response = await axios(scheduleUrl, {
        params: { ...params, page },
      });
      const moreInfo: AiringSched = await response.data;
      results.push(...moreInfo.results);
      page += 1;
      hasNextPage = moreInfo.hasNextPage;
    }

    const daysInfo: {
      [key: string]: { name: string; time: string }[] | undefined;
    } = {};
    const format = (string: string) => {
      if (string.length === 1) return `0${string}`;
      return string;
    };

    results.forEach((anime) => {
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const animeDate = new Date(anime.airingAt * 1000);
      const weekDay = weekDays[animeDate.getDay()];
      const hours = format(animeDate.getHours().toString());
      const minutes = format(animeDate.getMinutes().toString());
      const time = `${hours} : ${minutes}`;
      const date = `${weekDay} ${animeDate.getDate()}`;

      const obj = { name: anime.title.userPreferred, time };

      if (daysInfo[date] === undefined) {
        daysInfo[date] = [obj];
      } else {
        daysInfo[date]?.push(obj);
      }
    });
    return daysInfo;
  }

  async Random(): Promise<Random> {
    const randomUrl = `${this.url}/random-anime`;
    const response = await axios(randomUrl);
    const info = await response.data;
    return info;
  }
}

export default Anilist;
