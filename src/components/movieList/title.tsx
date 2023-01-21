import { FC, memo } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  text: string,
}

export const Title: FC<Props> = memo(
  ({ text }) => {
    const matchesMax600 = useMediaQuery('(max-width:600px)');

    return (
      <Typography
        gutterBottom
        variant="h4"
        ml={4}
        m={matchesMax600 ? 'auto' : ''}
        component="div"
        maxWidth={'100%'}
        width={'max-content'}
      >
        {text}
      </Typography>
    );
  },
);
