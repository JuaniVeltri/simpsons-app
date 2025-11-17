/**
 * Types for The Simpsons API
 * API Base URL: https://thesimpsonsapi.com/api
 */

export interface Character {
  id: number;
  name: string;
  age: number | string;
  birthdate: string;
  gender: "Male" | "Female" | string;
  occupation: string;
  status: "Alive" | "Deceased" | string;
  portrait_path: string;
  phrases: string[];
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  episode_number: number;
  airdate: string;
  synopsis: string;
  image_path: string;
}

export interface Location {
  id: number;
  name: string;
  town: string;
  use: string;
  image_path: string;
}

// Response structure from The Simpsons API
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
}

// Processed response with metadata
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  pages: number;
  currentPage: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CharacterFilters extends PaginationParams {
  gender?: string;
  status?: string;
  search?: string;
}

export interface EpisodeFilters extends PaginationParams {
  season?: number;
  search?: string;
}

export interface LocationFilters extends PaginationParams {
  type?: string;
  search?: string;
}

export type FavoriteType = "character" | "episode" | "location";

export interface Favorite {
  id: number;
  type: FavoriteType;
  data: Character | Episode | Location;
  addedAt: string;
}

export interface Stats {
  totalCharacters: number;
  aliveCharacters: number;
  deceasedCharacters: number;
  totalEpisodes: number;
  totalSeasons: number;
  totalLocations: number;
  locationsByType: Record<string, number>;
  episodesBySeason: Record<string, number>;
}
