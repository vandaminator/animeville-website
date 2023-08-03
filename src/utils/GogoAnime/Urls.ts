export const BASE_URL = "https://consum-net-api.vercel.app/anime/gogoanime";

export const searchUrl = (query: string, pageNumber = 1) => {
  const url = `${BASE_URL}/${encodeURIComponent(query)}?page=${pageNumber}`;
  return url;
};

export const recentEpisodesUrl = (pageNumber: number, type: 1 | 2 | 3) => {
  const url = `${BASE_URL}/recent-episodes?page=${pageNumber}&type=${type}`;
  return url;
};

export const topAiringUrl = (pageNumber: number) => {
  const url = `${BASE_URL}/top-airing?page=${pageNumber}`;
  return url;
};

export const infoUrl = (id: string) => {
  const url = `${BASE_URL}/info/${id}`;
  return url;
};

export const watchUrl = (
  episodeId: string,
  serverName: "gogocdn" | "streamsb" | "vidstreaming" = "gogocdn"
) => {
  const url = `${BASE_URL}/watch/${episodeId}?server=${serverName}`;
  return url;
};

export const serversUrl = (episodeId: string) => {
  const url = `${BASE_URL}/servers/${episodeId}`;
  return url;
};
