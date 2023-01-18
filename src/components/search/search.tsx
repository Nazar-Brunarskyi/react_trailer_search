/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useCallback,
  useState,
  useEffect,
  memo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { getMovies } from '../../API/getData';
import { debounce } from 'lodash';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';

export const Search: FC = memo(
  () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || '';

    const [value, setValue] = useState(query);
    const [options, setOptions] = useState<string[]>([]);

    const getOptions = (query: string) => {
      if (query.trim() === '') {
        setOptions([]);
        return;
      }

      getMovies(query)
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

    useEffect(() => {
      setValue(query);
    },[query])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      debouncedGetOptions('');

      searchParams.set('query', value);
      setOptions([]);

      setSearchParams(searchParams);
    }

    const handleChoiceOfOption = (event: any, newValue: string | null) => {
      if (newValue) {
        setValue(newValue);

        searchParams.set('query', newValue);

        setSearchParams(searchParams);
      }
    };

    return (
      <form
        style={{
          display: 'flex'
        }}
        onSubmit={handleSubmit}
      >
        <Autocomplete
          disablePortal
          value={value}
          id="combo-box-demo"
          getOptionLabel={(option) => (option ? `${option}` : '')}
          options={options}
          onChange={handleChoiceOfOption}
          freeSolo
          sx={{ width: '90%', margin: '50px auto', display: 'flex' }}
          renderInput={(params) => (
            <>
              <TextField
                onChange={(e) => setValue(e.currentTarget.value)}
                onBlur={() => setOptions([])}
                {...params}
                label="Enter movie"
              />

              <LoadingButton
                endIcon={<SearchIcon />}
                loading={false}
                loadingPosition="end"
                variant="contained"
                type="submit"
                sx={{ margin: '0 20px' }}
              />
            </>
          )}
        />
      </form>

    );
  },
);