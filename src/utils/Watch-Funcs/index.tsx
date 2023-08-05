import Search, { SubOrDub } from "@/types/GogoAnime/AnimeSearch";
import { infoUrl, searchUrl } from "../GogoAnime/Urls";
import Description, { Episode } from "@/types/GogoAnime/AnimeDescription";

type stream = [Episode | undefined, Episode[] | undefined];

const toHyphenatedLowerCase = (str: string) => {
  const hyphenatedStr = str
    .replace(/[^a-zA-Z0-9]+/g, "-") // Replace non-alphanumeric characters with a single hyphen
    .replace(/^-+|-+$/g, "") // Remove hyphens from the beginning or end of the string
    .toLowerCase(); // Convert to lowercase
  return hyphenatedStr;
};

const noStream: [undefined, undefined] = [undefined, undefined];

export async function searchByTitle(
  title: string,
  epNumber: number
): Promise<stream> {
  console.log("searching for anime");
  const searchResposnse = await fetch(searchUrl(title));
  if (!searchResposnse.ok) return noStream;

  const searchdata: Search = await searchResposnse.json();
  const subAnime = searchdata.results.find(
    (anime) => anime.title.includes(title) && anime.subOrDub === SubOrDub.Sub
  );

  if (subAnime === undefined) return noStream;

  const animeId = subAnime.id;
  const response = await fetch(infoUrl(animeId));
  if (!searchResposnse.ok) return noStream;

  const data: Description = await response.json();
  const episodes = data.episodes;
  const ep = episodes.find((e) => e.number === epNumber);

  return [ep, episodes];
}

export async function getByGogoId(name: string, epNumber = 1): Promise<stream> {
  const gogoId = toHyphenatedLowerCase(name);
  const gogoUrl = infoUrl(gogoId);
  const gogoResponse = await fetch(gogoUrl);

  if (!gogoResponse.ok) return noStream;
  const data: Description = await gogoResponse.json();

  if (data.episodes.length === 0) return noStream;
  const episodes = data.episodes;
  const ep = episodes.find((e) => e.number === epNumber);

  return [ep, episodes];
}

export async function getByTitle(name: string, epNumber = 1): Promise<stream> {
  const idEpWantedArray = name.split("-episode-");
  const newId = idEpWantedArray[0];

  const newGogoRes = await fetch(infoUrl(newId));
  if (!newGogoRes.ok) return noStream;
  const newGogoData: Description = await newGogoRes.json();

  if (newGogoData.episodes.length === 0) return noStream;
  const episodes = newGogoData.episodes;
  const ep = episodes.find((value) => value.number === epNumber);

  return [ep, episodes];
}
