import './App.scss';
import { Search } from './components/search/search';
import Container from '@mui/material/Container';
import { MovieList } from './components/movieList/movieList';
import { Header } from './components/header/header';

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
