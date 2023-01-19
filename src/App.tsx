import './App.scss';
import { Search } from './components/search/search';
import Container from '@mui/material/Container';
import { MovieList } from './components/movieList/movieList';
import { Header } from './components/header/header';
import { useSearchParams } from 'react-router-dom';
import { TrailerModal } from './components/trailerModal/trailerModal';

function App() {
  const [searchParams] = useSearchParams();

  const trailer = searchParams.get('trailer');

  return (
    <>
      <Header />
      <Container maxWidth="lg" >
        <Search />

        <MovieList />

        {trailer && <TrailerModal />}
      </Container >
    </>
  );
}

export default App;
