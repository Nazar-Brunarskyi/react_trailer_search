import { Movie } from "./Movie";

export interface Response {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
}