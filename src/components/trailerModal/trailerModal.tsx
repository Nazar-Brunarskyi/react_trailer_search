/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  FC,
  useEffect,
  memo,
  useMemo,
} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSearchParams } from 'react-router-dom';
import { getTrailersArr } from '../../API/getData';
import { Trailer } from '../../types/trailerObject';
import { TrailerVideo } from '../trailerVideo/trailerVideo';
import { SelectTrailers } from '../selectTrailer/selectTrailer';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

const center = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export const TrailerModal: FC = memo(
  () => {
    const matchesMin2300 = useMediaQuery('(min-width:2300px)');
    const matchesMin900 = useMediaQuery('(min-width:900px)');
    const matchesMin750 = useMediaQuery('(min-width:750px)');
    const matchesMin550 = useMediaQuery('(min-width:550px)');
    const matchesMin400 = useMediaQuery('(min-width:400px)');

    const [trailers, setTrailers] = useState<Trailer[]>([]);
    const [areTrailersLoaded, setAreTrailersLoaded] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const movieId = searchParams.get('trailer') || 0;
    const selectedTrailerKey = searchParams.get('trailerKey');

    const stylesForBox = useMemo(() => {
      let paddingBottom;
      let width;

      switch (true) {
        case matchesMin2300:
          width = 1300;
          break;
        case matchesMin900:
          width = '60%';
          break;
        case matchesMin750:
        default:
          width = '80%';
          break;
      }

      switch (true) {
        case matchesMin900:
          paddingBottom = '35%';
          break;
        case matchesMin750:
          paddingBottom = '45%';
          break;
        case matchesMin550:
          paddingBottom = '55%';
          break;
        case matchesMin400:
          paddingBottom = '80%';
          break;
        default:
          paddingBottom = '100%';
          break;
      }


      return {
        ...center,
        width,
        bgcolor: 'background.paper',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
        paddingBottom,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '90%',
      };
    }, [matchesMin900, matchesMin400, matchesMin550, matchesMin750, matchesMin2300]);


    useEffect(() => {
      getTrailersArr(+movieId)
        .then(trailersFromServer => {
          setTrailers(trailersFromServer)
          if (!selectedTrailerKey && (trailersFromServer.length > 0)) {
            searchParams.set('trailerKey', trailersFromServer[0].key)
            setSearchParams(searchParams)
          }
        })
        .finally(() => setAreTrailersLoaded(true));
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

            {!areTrailersLoaded && <CircularProgress sx={center} />}
            {areTrailersLoaded && <TrailerVideo />}
          </Box>
        </Modal>
      </div>
    );
  }
);
