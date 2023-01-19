import { FC, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Movie } from '../../types/Movie';
import { getTrailersArr } from '../../API/getData';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  movie: Movie,
}

export const MovieCard: FC<Props> = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    original_title,
  } = movie;
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParamsForTrailer = (id: number) => {
    searchParams.set('trailer', `${id}`)

    return searchParams.toString();
  }

  useEffect(() => searchParams.delete('trailer'), [])

  const photoPath = poster_path 
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

  return (
    <Link to={{ search: getSearchParamsForTrailer(id) }} >
      <Card
        sx={{ maxWidth: '100%', height: 550, textDecoration: 'none' }}
      >
        <CardActionArea sx={{ height: 550 }}>
          <CardMedia
            sx={{ height: '85%' }}
            component="img"
            height="350"
            image={photoPath}
            alt={original_title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card >
    </Link >
  );
}