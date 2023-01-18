import { MovieResponse } from "../types/responseType";
import { Trailer, TrailerResponse } from "../types/trailerObject";
import { URL_FOR_SEARCH } from "./API_VARIABLES";

export function getMoviesData(query: string): Promise<MovieResponse> {
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
  const preparedQuery = query
    .split(' ')
    .filter(Boolean)
    .join(' ')
    .replaceAll(' ', '%20')
    .trim();

  return getMoviesData(preparedQuery)
    .then(data => (
      data.results
    ))
}

export function getTrailers(movieId: number): Promise<TrailerResponse> {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4218253ea3996b68858664a469ad2ba1&language=en-US`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error('something went wrong, try later!')
    }

    return response.json();
  })
  .catch(error => alert(error.message))
}

export function getTrailersArr (movieId: number): Promise<Trailer[]> {
  return getTrailers(movieId)
    .then(response => response.results);
}