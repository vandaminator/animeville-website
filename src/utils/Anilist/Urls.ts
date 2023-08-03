import { SearchProps } from "./types";

export const BASE_URL = "https://consum-net-api.vercel.app/meta/anilist";

export const searchUrl = (data: SearchProps) => {
  // @ts-ignore
  const searchStr = new URLSearchParams(data).toString();
  const url = `${BASE_URL}/advanced-search?${searchStr}`;
  return url;
};

export const infoUrl = (id: string) => {
  const url = `${BASE_URL}/info/${id}`;
  return url;
};

export const streamUrl = (epId: string) => {
  const url = `${BASE_URL}/watch/${epId}`;
  return url;
};

export const recentEpisodesUrl = () => {
  const url = `${BASE_URL}/recent-episodes`;
  return url;
};

export const trendingUrl = () => {
  const url = `${BASE_URL}/trending`;
  return url;
};

export const popularUrl = () => {
  const url = `${BASE_URL}/popular`;
  return url;
};

export const airingScheduleUrl = () => {
  const queryParams = new URLSearchParams({ notYetAired: "true" }).toString();
  const url = `${BASE_URL}/airing-schedule?${queryParams}`;
  return url;
};

export const randomAnimeUrl = () => {
  const url = `${BASE_URL}/random-anime`;
  return url;
};

export const episodesUrl = (id: string) => {
  const url = `${BASE_URL}/episodes/${id}`;
  return url;
};

export const serversUrl = (id: string) => {
  const url = `${BASE_URL}/servers/${id}`;
  return url;
};
