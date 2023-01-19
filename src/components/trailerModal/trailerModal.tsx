import { useState, FC, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSearchParams } from 'react-router-dom';
import { getTrailersArr } from '../../API/getData';
import { Trailer } from '../../types/trailerObject';
import { TrailerVideo } from '../trailerVideo/trailerVideo';

const stylesForBox = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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

export const TrailerModal: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trailers, setTrailers] = useState<Trailer[]>();
  // const [isTrailerLoaded, setIsTrailerLoaded] = useState(false);

  const movieId = searchParams.get('trailer') || 0;

  useEffect(() => {
    getTrailersArr(+movieId)
      .then(setTrailers)
      // .then(console.log)
  }, [])

  const handleClose = () => {
    searchParams.delete('trailer')

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
          {trailers && <TrailerVideo videoKey={trailers[0].key} />}
        </Box>
      </Modal>
    </div>
  );
}
