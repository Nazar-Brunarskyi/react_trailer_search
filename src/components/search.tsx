/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getMovies } from '../API/getData';
import { debounce } from 'lodash';

export const Search: FC = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<string[]>(['sd']);

  const getOptions = useCallback(
    debounce((query: string) => {
      const preparedQuery = query
        .split(' ')
        .filter(Boolean)
        .join(' ')
        .replaceAll(' ', '%20')
      
      if (preparedQuery === '') {
        return;
      }

      getMovies(preparedQuery)
        .then(movies => {
          const movieTitles = movies.map(movie => movie.original_title)          
          const uniqueMovieTitles = new Set(movieTitles);
          setOptions(
            Array.from(uniqueMovieTitles),
          );
        })
    }, 500),
    []
  );

  useEffect(() => {
    getOptions(value)
  }, [value])

  return (
    <form>
      <Autocomplete
        disablePortal
        value={value}
        id="combo-box-demo"
        getOptionLabel={(option) => (option ? `${option}` : '')}
        options={options}
        sx={{ width: '60%', margin: '50px auto' }}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setValue(e.currentTarget.value)}
            {...params}
            label="Enter movie name"
          />
        )}
      />
    </form>

  );
}