/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useCallback,
  useState,
  useEffect,
  memo,
} from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getMovies } from '../../API/getData';
import { debounce } from 'lodash';
import LoadingButton from '@mui/lab/LoadingButton';

import SearchIcon from '@mui/icons-material/Search';

export const Search: FC = memo(
  () => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
  
    const getOptions = (query: string) => {
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
    }
  
    const debouncedGetOptions = useCallback(debounce(getOptions, 300), []);
  
    useEffect(() => {
      debouncedGetOptions(value)
    }, [value])
  
    return (
      <form style={{
        display: 'flex'
      }}>
        <Autocomplete
          disablePortal
          value={value}
          id="combo-box-demo"
          getOptionLabel={(option) => (option ? `${option}` : '')}
          options={options}
          sx={{ width: '90%', margin: '50px auto', display: 'flex' }}
          renderInput={(params) => (
            <>
              <TextField
                onChange={(e) => setValue(e.currentTarget.value)}
                onBlur={() => setOptions([])}
                {...params}
                label="Enter movie name"
              />
  
              <LoadingButton
                endIcon={<SearchIcon />}
                loading={false}
                loadingPosition="end"
                variant="contained"
                type="submit"
                sx={{ margin: '0 20px' }}
              >
                <span>Search</span>
              </LoadingButton>
            </>
          )}
        />
      </form>
  
    );
  },  
);