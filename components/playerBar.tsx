import { Flex, Text, Box } from '@chakra-ui/layout';
import { useStoreState } from 'easy-peasy';
// components
import Player from './player';
// lib
import { SongModel } from '../lib/store';
// types
import { ISong } from '../types/song';

const PlayerBar = () => {
  const activeSong = useStoreState<SongModel, ISong>(
    (state) => state.activeSong,
  );
  const songs = useStoreState<SongModel, ISong[]>((state) => state.activeSongs);

  return (
    <Flex height="100%" align="center">
      <Flex flexDirection="column" flexBasis="30%" justify="center">
        <Text>{activeSong?.songName}</Text>
        <Text>{activeSong?.artist.name}</Text>
      </Flex>
      {activeSong && (
        <Box flexBasis="40%">
          <Player songs={songs} activeSong={activeSong} />
        </Box>
      )}
      <Flex flexBasis="30%" justify="flex-end" align="center" gap={4}>
        control song
      </Flex>
    </Flex>
  );
};

export default PlayerBar;
