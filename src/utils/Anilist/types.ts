export interface GenericProps {
  page?: number;
  perPage?: number;
}

export interface SearchProps extends GenericProps {
  query?: string; 
  season?: Season;
  format?: Format;
  sort?: [SortField];
  genres?: [Genre];
  id?: string;
  year?: string;
  status?: [ReleaseStatus];
}

export enum Season {
  WINTER = "WINTER",
  SUMMER = "SUMMER",
  SPRING = "SPRING",
  FALL = "FALL",
}

export enum Format {
  TV = "TV",
  TV_SHORT = "TV_SHORT",
  OVA = "OVA",
  ONA = "ONA",
  MOVIE = "MOVIE",
}

export enum SortField {
  POPULARITY_DESC = "POPULARITY_DESC",
  POPULARITY = "POPULARITY",
  TRENDING_DESC = "TRENDING_DESC",
  TRENDING = "TRENDING",
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
  UPDATED_AT = "UPDATED_AT",
  START_DATE_DESC = "START_DATE_DESC",
  START_DATE = "START_DATE",
  END_DATE_DESC = "END_DATE_DESC",
  END_DATE = "END_DATE",
  FAVOURITES_DESC = "FAVOURITES_DESC",
  FAVOURITES = "FAVOURITES",
  SCORE_DESC = "SCORE_DESC",
  SCORE = "SCORE",
  TITLE_ROMAJI_DESC = "TITLE_ROMAJI_DESC",
  TITLE_ROMAJI = "TITLE_ROMAJI",
  TITLE_ENGLISH_DESC = "TITLE_ENGLISH_DESC",
  TITLE_ENGLISH = "TITLE_ENGLISH",
  TITLE_NATIVE_DESC = "TITLE_NATIVE_DESC",
  TITLE_NATIVE = "TITLE_NATIVE",
  EPISODES_DESC = "EPISODES_DESC",
  EPISODES = "EPISODES",
  ID = "ID",
  ID_DESC = "ID_DESC",
}

export enum Genre {
  Action = "Action",
  Adventure = "Adventure",
  Cars = "Cars",
  Comedy = "Comedy",
  Drama = "Drama",
  Fantasy = "Fantasy",
  Horror = "Horror",
  "Mahou Shoujo" = "Mahou Shoujo",
  Mecha = "Mecha",
  Music = "Music",
  Mystery = "Mystery",
  Psychological = "Psychological",
  Romance = "Romance",
  "Sci-Fi" = "Sci-Fi",
  "Slice of Life" = "Slice of Life",
  Sports = "Sports",
  Supernatural = "Supernatural",
  Thriller = "Thriller",
}

enum ReleaseStatus {
  RELEASING = "RELEASING",
  NOT_YET_RELEASED = "NOT_YET_RELEASED",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
  HIATUS = "HIATUS",
}

