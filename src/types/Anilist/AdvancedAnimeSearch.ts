// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface AdvancedSearch {
    currentPage:  number;
    hasNextPage:  boolean;
    totalPages:   number;
    totalResults: number;
    results:      Result[];
}

export interface Result {
    id:              string;
    malId:           number;
    title:           Title;
    status:          Status;
    image:           string;
    cover:           null | string;
    popularity:      number;
    totalEpisodes:   number | null;
    currentEpisode:  number | null;
    countryOfOrigin: CountryOfOrigin;
    description:     string;
    genres:          string[];
    rating:          number | null;
    color:           null | string;
    type:            Type;
    releaseDate:     number;
}

export enum CountryOfOrigin {
    Jp = "JP",
}

export enum Status {
    Completed = "Completed",
    NotYetAired = "Not yet aired",
    Ongoing = "Ongoing",
}

export interface Title {
    romaji:        string;
    english:       null | string;
    native:        string;
    userPreferred: string;
}

export enum Type {
    Movie = "MOVIE",
    Special = "SPECIAL",
    Tv = "TV",
}
