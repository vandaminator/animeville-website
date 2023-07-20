import Search from "@/types/GogoAnime/AnimeSearch";
import axios from "axios";
import { RecentEp } from "@/types/GogoAnime/AnimeRecentEp";
import Description from "@/types/GogoAnime/AnimeDescription";
import { TopAiring } from "@/types/GogoAnime/AnimeTop";
import { severNames } from "./types";
import StreamingLinks from "@/types/GogoAnime/AnimeStreamingLinks";
import Servers from "@/types/GogoAnime/AnimeServers";

/**
 * * Documentation: https://docs.consumet.org/rest-api/Anime/gogoanime/search
 */
class GogoAnime {
  api = "https://consum-net-api.vercel.app";
  url = `${this.api}/anime/gogoanime`;

  async Search(name: string, page: number = 1): Promise<Search> {
    const searchUrl = `${this.url}/${name}`;
    const response = (await axios<Search>(searchUrl, { params: { page } })).data;
    return response;
  }

  /**
   *  type can only be range from 1-3
   *  1 is Sub, 2 is Dub and 3 is chinese
   *
   * @param page number
   * @param type number
   * @returns RecentEp
   */
  async getRecentEp(page: number = 1, type = 1): Promise<RecentEp> {
    const recentEpUrl = `${this.url}/recent-episodes`;
    const response = (
      await axios<RecentEp>(recentEpUrl, { params: { page, type } })
    ).data;
    return response;
  }

  /**
   *
   * @param id number
   * @returns Description
   */
  async getAnimeInfo(id: string): Promise<Description> {
    const infoUrl = `${this.url}/info/${id}`;
    const response = (await axios<Description>(infoUrl)).data;
    return response;
  }

  /**
   *
   * @param page number
   * @returns TopAiring
   */
  async getTopAiring(page: number = 1): Promise<TopAiring> {
    const topUrl = `${this.url}/top-airing`;
    const response = (await axios<TopAiring>(topUrl, { params: { page } }))
      .data;
      return response;
  }

  /**
   *
   * @param epId string
   * @param server gogocdn | streamsb | vidstreaming
   * @returns StreamingLinks
   */
  async getStreamingLinks(
    epId: string,
    server: severNames = "gogocdn"
  ): Promise<StreamingLinks> {
    const streamUrl = `${this.url}/watch/${epId}`;
    const response = (
      await axios<StreamingLinks>(streamUrl, { params: { server } })
    ).data;
    return response;
  }

  /**
   *
   * @param epId string
   * @returns Servers
   */
  async getEpAvailableServers(epId: string): Promise<Servers> {
    const serverUrl = `${this.url}/servers/${epId}`;
    const response = (await axios<Servers>(serverUrl)).data;
    return response;
  }
}

export default GogoAnime;
