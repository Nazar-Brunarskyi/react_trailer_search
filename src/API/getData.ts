import { Response } from "../types/responseType";
import { URL_FOR_SEARCH } from "./API_VARIABLES";

export function getMoviesData(query: string): Promise<Response> {
  return fetch(
    URL_FOR_SEARCH + query,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('something went wrong, try later!')
      }

      return response.json();
    })
    .catch(error => alert(error.message))
}

export function getMovies(query: string) {
  return getMoviesData(query)
    .then(data => (
      data.results
    ))
}