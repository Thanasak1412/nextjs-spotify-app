import { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdRepeat,
} from 'react-icons/md';
import ReactHowler from 'react-howler';
import { useStoreActions, Actions } from 'easy-peasy';
// lib
import { convertNumberToTime } from '../lib/formatTime';
// types
import { ISong } from '../types/song';
import { SongModel } from '../lib/store';

type Props = {
  songs: ISong[];
  activeSong: ISong;
};

const Player = ({ songs, activeSong }: Props) => {
  const [playing, setPlaying] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [duration, setDuration] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [index, setIndex] = useState(activeSong.id);

  const onActiveSong = useStoreActions(
    (state: Actions<SongModel>) => state.onActiveSong,
  );

  const songRef = useRef(null);
  const repeatRef = useRef(null);

  const onShuffle = () => {
    setShuffle((prev) => !prev);
  };

  const onRepeat = () => {
    setRepeat((prev) => !prev);
  };

  const handlePlaying = (value: boolean) => {
    setPlaying(value);
  };

  const handlePreviousSong = () => {
    setIndex((prevIndex) => (prevIndex ? prevIndex - 1 : songs.length - 1));
  };

  const handleNextSong = () => {
    setIndex((prevIndex) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === prevIndex) {
          return handleNextSong();
        }

        return next;
      }

      return prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
    });

    return index + 1;
  };

  const onLoad = () => {
    const songDuration = songRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (value: number[]) => {
    setSeek(value[0]);
    songRef.current.seek(value[0]);
  };

  const onEnd = () => {
    if (!repeatRef.current) {
      handleNextSong();
    }

    onSeek([0]);
  };

  const onChangeStart = () => {
    setIsSeeking(true);
  };

  const onChangeEnd = () => {
    setIsSeeking(false);
  };

  useEffect(() => {
    let timerId: number;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(songRef.current?.seek() ?? 0.0);
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);

      return () => cancelAnimationFrame(timerId);
    }

    return () => cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setSeek(0.0);
    setDuration(activeSong.duration);
  }, [activeSong]);

  useEffect(() => {
    onActiveSong(songs[index]);
  }, [index, songs, onActiveSong]);

  useEffect(() => {
    if (repeat) {
      repeatRef.current = repeat;
    }
  }, [repeat]);

  return (
    <Flex flexDirection="column" justify="center" align="center">
      {activeSong && (
        <ReactHowler
          playing={playing}
          src={activeSong.url}
          ref={songRef}
          loop={repeat}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      )}
      <Box width="100%">
        <ButtonGroup width="100%" justifyContent="center" spacing="0">
          <IconButton
            icon={<MdShuffle />}
            variant="link"
            outline="none"
            color={!shuffle ? 'gray.700' : 'white'}
            size="lg"
            aria-label="shuffle song"
            onClick={onShuffle}
          />
          <IconButton
            icon={<MdSkipPrevious />}
            variant="link"
            outline="none"
            size="lg"
            aria-label="skip previous song"
            onClick={handlePreviousSong}
          />

          {playing && activeSong ? (
            <IconButton
              icon={<MdPauseCircleFilled />}
              variant="link"
              color="white"
              outline="none"
              fontSize="2rem"
              aria-label="pause song"
              onClick={() => handlePlaying(false)}
            />
          ) : (
            <IconButton
              icon={<MdPlayCircleFilled />}
              variant="link"
              color="white"
              outline="none"
              fontSize="2rem"
              aria-label="play song"
              onClick={() => handlePlaying(true)}
              disabled={songs.length < 1}
            />
          )}

          <IconButton
            icon={<MdSkipNext />}
            variant="link"
            outline="none"
            size="lg"
            aria-label="skip next song"
            onClick={handleNextSong}
          />
          <IconButton
            icon={<MdRepeat />}
            variant="link"
            outline="none"
            color={!repeat ? 'gray.700' : 'white'}
            size="lg"
            aria-label="repeat song"
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Box>
      <Box width="100%">
        <Flex align="center" gap={2}>
          <Text fontSize="xs">{convertNumberToTime(seek)}</Text>
          <RangeSlider
            // eslint-disable-next-line jsx-a11y/aria-proptypes
            aria-label={['min', 'max']}
            min={0}
            max={duration ? +duration.toFixed(2) : 0}
            step={0.1}
            defaultValue={[0, 0]}
            value={[seek]}
            isDisabled={songs.length < 1}
            id="player-range"
            onChange={onSeek}
            onChangeStart={onChangeStart}
            onChangeEnd={onChangeEnd}
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="gray.600" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={5} index={0} display="none" />
          </RangeSlider>
          <Text fontSize="xs">{convertNumberToTime(duration)}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Player;
