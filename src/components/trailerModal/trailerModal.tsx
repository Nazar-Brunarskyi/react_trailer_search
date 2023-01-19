/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  FC,
  useEffect,
  memo,
} from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSearchParams } from 'react-router-dom';
import { getTrailersArr } from '../../API/getData';
import { Trailer } from '../../types/trailerObject';
import { TrailerVideo } from '../trailerVideo/trailerVideo';
import { SelectTrailer } from '../selectTrailer/selectTrailer';
import CircularProgress from '@mui/material/CircularProgress';

const center = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const stylesForBox = {
  ...center,
  width: '60%',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
  paddingBottom: '35%',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const TrailerModal: FC = memo(
  () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [areTrailersLoaded, setAreTrailersLoaded] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState('')

    const movieId = searchParams.get('trailer') || 0;

    useEffect(() => {
      getTrailersArr(+movieId)
        .then(trailersFromServer => {
          setTrailers(trailersFromServer)
          if (trailersFromServer[0]) {
            setSelectedTrailer(trailersFromServer[0].key)
          }
          setAreTrailersLoaded(true);
        })
    }, [])

    const handleClose = () => {
      searchParams.delete('trailer')

      setSearchParams(searchParams);
    };

    // console.log(trailers);
    

    return (
      <div>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={stylesForBox}>
            <SelectTrailer
              trailers={trailers}
              selectedTrailerKey={selectedTrailer}
              onSelect={setSelectedTrailer}
            />

            { !areTrailersLoaded && <CircularProgress sx={center} />}
            { areTrailersLoaded && <TrailerVideo videoKey={selectedTrailer} />}
          </Box>
        </Modal>
      </div>
    );
  }
);
