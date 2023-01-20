import { useState, FC, memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Trailer } from '../../types/trailerObject';
import { useSearchParams } from 'react-router-dom';

interface Props {
  trailers: Trailer[],
}

export const SelectTrailers: FC<Props> = memo(
  ({
    trailers,
  }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedTrailerKey = searchParams.get('trailerKey');

    const handleChange = (event: SelectChangeEvent) => {
      searchParams.set('trailerKey', event.target.value as string)
      setSearchParams(searchParams)
    };

    return (
      <Box sx={{ minWidth: '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Trailers</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTrailerKey || 'there are no trailers'}
            label="Trailers"
            onChange={handleChange}
          >
            {
              trailers.map(({ key, id, name }) => (
                <MenuItem
                  key={id}
                  value={key}
                >
                  {name}
                </MenuItem>
              ))
            }

            {trailers.length === 0 && (
              <MenuItem value="there are no trailers" >
                there are no trailers
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    );
  }
);
