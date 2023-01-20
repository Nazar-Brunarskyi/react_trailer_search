import './App.scss';
import { Search } from './components/search/search';
import Container from '@mui/material/Container';
import { MovieList } from './components/movieList/movieList';
import { Header } from './components/header/header';
import { useSearchParams } from 'react-router-dom';
import { TrailerModal } from './components/trailerModal/trailerModal';
import { useState } from 'react';

function App() {
  const [homeClick, setHomeClick] = useState(0);
  const [searchParams] = useSearchParams();

  const trailer = searchParams.get('trailer');

  return (
    <>
      <Header onHomeClick={setHomeClick}/>
      
      <Container maxWidth="lg" >
        <Search />

        <MovieList shouldUpdate={homeClick} />

        {trailer && <TrailerModal />}
      </Container >
    </>
  );
}

export default App;
