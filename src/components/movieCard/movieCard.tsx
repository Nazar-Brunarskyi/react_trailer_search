import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Movie } from '../../types/Movie';

interface Props {
  movie: Movie,
}

export const MovieCard: FC<Props> = ({ movie }) => {
  const {
    title,
    poster_path,
    original_title,
    overview
  } = movie; 

  return (
    <Card sx={{ maxWidth: '100%', height: 550 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
}