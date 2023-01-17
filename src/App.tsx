import './App.scss';
import { Search } from './components/search/search';
import Grid from '@mui/material/Grid';
import { MovieCard } from './components/movieCard/movieCard';
import Container from '@mui/material/Container';

const s = {
  border: '1px solid red'
};

function App() {
  return (
    <Container maxWidth="lg" >
      <Search />


      <Grid
        container
        rowSpacing={3}
        columns={11}
        sx={{ ...s, justifyContent: 'space-around'}}
      >
        <Grid item xs={1} md={3} >
          <MovieCard />
        </Grid>
        <Grid item xs={1} md={3} >
          <MovieCard />
        </Grid>
        <Grid item xs={1} md={3} >
          <MovieCard />
        </Grid>
        <Grid item xs={1} md={3} >
          <MovieCard />
        </Grid>

        <Grid item xs={1} md={3} >
          <MovieCard />
        </Grid>

        <Grid item xs={1} md={3} >
          
        </Grid>
      </Grid>
    </Container >
  );
}

export default App;
