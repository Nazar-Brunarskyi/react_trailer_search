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
import Alert from '@mui/material/Alert';
import { Title } from './title';


interface Props {
  shouldUpdate: number;
}

export const MovieList: FC<Props> = memo(
  ({ shouldUpdate }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState('');

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
      if (query) {
        setIsLoading(true);

        getMovies(query)
          .then(setMovies)
          .then(() => setTitle(`Search results: «${query}»`))
          .finally(() => setIsLoading(false))
      }

    }, [query])

    useEffect(() => {
      if (!query) {
        setIsLoading(true);

        getTheMostWatched()
          .then(setMovies)
          .then(() => setTitle('Popular now:'))
          .finally(() => setIsLoading(false))
      }
    }, [shouldUpdate, query])

    const moviesToRender = useMemo(() => fillAnArray(movies), [movies]);
    const lengthOfList = useMemo(() => moviesToRender.length, [moviesToRender]);

    const shouldLoaderBeRendered = isLoading;
    const shouldListBeRendered =  !isLoading && lengthOfList !== 0;
    const shouldAlertBeRendered = !isLoading && lengthOfList === 0; 
    const shouldTitleBeRendered =  shouldListBeRendered;

    return (
      <>
        { shouldTitleBeRendered && <Title text={title} /> }

        <Grid
          container
          rowSpacing={3}
          columns={11}
          sx={{ justifyContent: 'space-around', marginBottom: 20 }}
        >
          {shouldLoaderBeRendered && <CircularProgress />}

          {
            shouldListBeRendered && moviesToRender.map((movie, index) => {
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
            shouldAlertBeRendered && (
              <Alert
                severity="info"
                sx={{ width: '90%' }}
              >
                there isn't such movie or you did mistake while typing
              </Alert>
            )
          }
        </Grid>
      </>
    );
  },
);
