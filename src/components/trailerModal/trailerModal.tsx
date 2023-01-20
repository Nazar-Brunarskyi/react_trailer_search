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
import { SelectTrailers } from '../selectTrailer/selectTrailer';
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
    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [areTrailersLoaded, setAreTrailersLoaded] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const movieId = searchParams.get('trailer') || 0;
    const selectedTrailerKey = searchParams.get('trailerKey');


    useEffect(() => {
      getTrailersArr(+movieId)
        .then(trailersFromServer => {
          setTrailers(trailersFromServer)
          if (!selectedTrailerKey && (trailersFromServer.length > 0)) {
            searchParams.set('trailerKey', trailersFromServer[0].key)
            setSearchParams(searchParams)
          }
          setAreTrailersLoaded(true);
        })
    }, [])

    const handleClose = () => {
      searchParams.delete('trailer')
      searchParams.delete('trailerKey')
      setSearchParams(searchParams);
    };    

    return (
      <div>
        <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={stylesForBox}>
            <SelectTrailers
              trailers={trailers}
            />

            { !areTrailersLoaded && <CircularProgress sx={center} />}
            { areTrailersLoaded && <TrailerVideo />}
          </Box>
        </Modal>
      </div>
    );
  }
);
