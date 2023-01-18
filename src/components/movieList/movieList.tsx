import { Grid } from '@mui/material';
import {
  FC,
  memo,
  useState,
  useEffect,
} from 'react';
import { MovieCard } from '../movieCard/movieCard';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Movie } from '../../types/Movie';
import { getMovies } from '../../API/getData';
import { fillAnArray } from './helpers';

const s = {
  border: '1px solid red'
};

export const MovieList: FC = memo(
  () => {
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
      } else {
        setMovies([]);
      }

    }, [query])

    const movieToRender = fillAnArray(movies);

    console.log(movieToRender);

    return (
      <Grid
        container
        rowSpacing={3}
        columns={11}
        sx={{ justifyContent: 'space-around', marginBottom: 20 }}
      >

        {isLoading && <CircularProgress />}

        {
          !isLoading && movieToRender.map((movie, index) => {
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
      </Grid>
    );
  },
);
