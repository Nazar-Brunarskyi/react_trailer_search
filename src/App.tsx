import './App.scss';
import { Search } from './components/search/search';
import Container from '@mui/material/Container';
import { MovieList } from './components/movieList/movieList';
import { Header } from './components/header/header';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" >
        <Search />

        <MovieList />
      </Container >
    </>
  );
}

export default App;
