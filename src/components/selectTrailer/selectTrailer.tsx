import { useState, FC, memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Trailer } from '../../types/trailerObject';

interface Props {
  trailers: Trailer[],
  selectedTrailerKey: string,
  onSelect: React.Dispatch<React.SetStateAction<string>>,
}

export const SelectTrailer: FC<Props> = memo(
  ({
    trailers,
    selectedTrailerKey,
    onSelect,
  }) => {
    const selectedTrailer = useMemo(() => (
      trailers.find(({key}) => selectedTrailerKey === key)
    ),[selectedTrailerKey, trailers])

    const handleChange = (event: SelectChangeEvent) => {
      onSelect(event.target.value as string);
    };

    return (
      <Box sx={{ minWidth: '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{selectedTrailer?.name}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTrailer?.key}
            label={selectedTrailer?.name}
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
          </Select>
        </FormControl>
      </Box>
    );
  }
);
