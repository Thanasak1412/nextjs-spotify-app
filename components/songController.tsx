import { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import {
  CloseButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { GoMute, GoUnmute } from 'react-icons/go';
import { PiPictureInPictureFill } from 'react-icons/pi';
// components
import Image from './chakraImage';

type Props = {
  volume: number;
  handleVolume: (v: number[]) => void;
  songId: number;
};

const SongController = ({ volume, handleVolume, songId }: Props) => {
  const [isPicInPic, setIsPicInPic] = useState(false);

  const handlePicInPic = () => {
    setIsPicInPic((prev) => !prev);
  };

  return (
    <>
      <Box flexBasis="40%" />
      {volume === 0 ? (
        <IconButton
          icon={<GoMute />}
          variant="link"
          outline="none"
          size="lg"
          aria-label="mute song"
          flexBasis="10%"
          onClick={() => handleVolume([null])}
        />
      ) : (
        <IconButton
          icon={<GoUnmute />}
          variant="link"
          outline="none"
          size="lg"
          aria-label="unmute song"
          flexBasis="10%"
          onClick={() => handleVolume([0.0])}
        />
      )}
      <Box height="100%" flexBasis="30%">
        <RangeSlider
          //   eslint-disable-next-line jsx-a11y/aria-proptypes
          aria-label={['min', 'max']}
          min={0}
          max={1}
          step={0.1}
          defaultValue={[0.5, 1]}
          value={[volume]}
          id="song-range"
          verticalAlign="super"
          onChange={handleVolume}
        >
          <RangeSliderTrack height="0.25rem" bg="gray.800">
            <RangeSliderFilledTrack bg="gray.500" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} display="none" />
        </RangeSlider>
      </Box>
      <Box flexBasis="10%">
        <Tooltip label="Picture in picture">
          <IconButton
            icon={<PiPictureInPictureFill />}
            variant="link"
            outline="none"
            fontSize="2xl"
            aria-label="picture in picture"
            verticalAlign="middle"
            sx={{
              '&:hover': {
                color: 'white',
              },
            }}
            onClick={handlePicInPic}
          />
        </Tooltip>
      </Box>
      <Box flexBasis="10%" />

      {isPicInPic && (
        <Box width="60" height="60" position="fixed" right="24" bottom="24">
          <Box width="100%" position="relative">
            <CloseButton
              size="sm"
              onClick={handlePicInPic}
              position="absolute"
              top="3"
              right="3"
              color="white"
              border="0.5px solid white"
              bgColor="black"
              cursor="pointer"
              zIndex={2}
            />
            <Image src={`https://picsum.photos/400?random=${songId}`} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default SongController;
