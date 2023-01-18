import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Movie } from '../../types/Movie';
import { getTrailersArr } from '../../API/getData';

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

  const handleClick = (movieId: number) => {
    getTrailersArr(movieId)
      .then((resp) => console.log(resp))
  }

  return (
    <Card
      sx={{ maxWidth: '100%', height: 550 }}
      onClick={() => handleClick(id)}
    >
      <CardActionArea sx={{ height: 550 }}>
        <CardMedia
          sx={{ height: '85%' }}
          component="img"
          height="350"
          image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card >
  );
}