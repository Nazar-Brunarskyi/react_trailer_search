import { Grid } from '@mui/material';
import {
  FC,
  memo,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { MovieCard } from '../movieCard/movieCard';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Movie } from '../../types/Movie';
import { getMovies, getTheMostWatched } from '../../API/getData';
import { fillAnArray } from './helpers';

interface Props {
  shouldUpdate: number;
}

export const MovieList: FC<Props> = memo(
  ({ shouldUpdate }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const query = searchParams.get('query');

    useEffect(() => {
      if (query) {
        setIsLoading(true);

        getMovies(query)
          .then(moviesFromServer => {
            setMovies(moviesFromServer)

            setIsLoading(false);
          })
      }

    }, [query])

    useEffect(() => {
      if (!query) {
        setIsLoading(true);

        getTheMostWatched()
          .then(setMovies)
          .finally(() => setIsLoading(false))
      }
    }, [shouldUpdate, query])

    const moviesToRender = useMemo(() => fillAnArray(movies), [movies]);
    const lengthOfList = useMemo(() => moviesToRender.length, [moviesToRender])

    return (
      <>
        <Grid
          container
          rowSpacing={3}
          columns={11}
          sx={{ justifyContent: 'space-around', marginBottom: 20 }}
        >
          {isLoading && <CircularProgress />}

          {
            !isLoading && lengthOfList !== 0 && moviesToRender.map((movie, index) => {
              return movie === null
                ? (
                  <Grid
                    key={index}
                    item
                    xs={11}
                    sm={5}
                    md={3}
                  />
                )
                : (
                  <Grid
                    key={movie.id}
                    item
                    xs={11}
                    sm={5}
                    md={3}
                  >
                    <MovieCard movie={movie} />
                  </Grid>
                )
            })
          }

          {
            !isLoading && lengthOfList === 0 && (
              <h2>there isn't such movie or you did mistake while typing</h2>
            )
          }
        </Grid>
      </>
    );
  },
);
