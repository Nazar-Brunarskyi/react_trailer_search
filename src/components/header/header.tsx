import { FC, memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface Props {
  onHomeClick: React.Dispatch<React.SetStateAction<number>>,
}

export const Header: FC<Props> = memo(
  ({ onHomeClick }) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Link
              to="/"
              style={{ color: 'white' }}
              onClick={() => onHomeClick((prevNumber) => ++prevNumber)}
            >
              <Typography variant="h5" color="inherit" component="div">
                TrailerSearch
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box >
    );
  },
);
