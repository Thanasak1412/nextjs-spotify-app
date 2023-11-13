import { useRef, useState } from 'react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { useStoreState } from 'easy-peasy';
// components
import Player from './player';
import SongController from './songController';
import Image from './chakraImage';
// lib
import { SongModel } from '../lib/store';
// types
import { ISong } from '../types/song';

const PlayerBar = () => {
  const activeSong = useStoreState<SongModel, ISong>(
    (state) => state.activeSong,
  );
  const songs = useStoreState<SongModel, ISong[]>((state) => state.activeSongs);

  const volumeRef = useRef(0.0);

  const [volume, setVolume] = useState(0.5);

  const handleVolume = (v?: number[]) => {
    if (v[0] === 0) {
      volumeRef.current = volume || 0.5;
    }

    setVolume(v[0] ?? volumeRef.current);
  };

  if (!activeSong) {
    return null;
  }

  return (
    <Flex height="100%" align="center">
      <Flex flexBasis="30%" align="center" gap="4">
        <Box width="14" height="14">
          <Image src={`https://picsum.photos/400?random=${activeSong.id}`} />
        </Box>
        <Box height="100%">
          <Text color="gray.500" fontSize="sm" marginRight="4">
            {activeSong.songName}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {activeSong.artist.name}
          </Text>
        </Box>
      </Flex>
      <Box flexBasis="40%">
        <Player songs={songs} activeSong={activeSong} volume={volume} />
      </Box>
      <Flex flexBasis="30%" justify="flex-end" align="center">
        <SongController
          volume={volume}
          handleVolume={handleVolume}
          songId={activeSong.id}
        />
      </Flex>
    </Flex>
  );
};

export default PlayerBar;
