import { FC, memo } from 'react';

const stiles = {
  position: 'absolute' as 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 4,
};

interface Props {
  videoKey: string,
}

export const TrailerVideo: FC<Props> = memo(
  ({ videoKey }) => {
    return (
      <iframe
        style={stiles}
        width="95%"
        height="75%"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      />
    );
  },
);
