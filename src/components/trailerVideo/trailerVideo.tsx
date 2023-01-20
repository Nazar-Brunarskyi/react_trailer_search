import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

const stiles = {
  position: 'absolute' as 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 4,
};

export const TrailerVideo: FC = memo(
  () => {
    const [searchParams] = useSearchParams();
    const trailerKey = searchParams.get('trailerKey') || '_XRnENg_QI0';
    
    return (
      <iframe
        style={stiles}
        width="95%"
        height="75%"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
    );
  },
);
