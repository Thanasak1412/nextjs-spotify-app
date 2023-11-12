import { Actions, useStoreActions } from 'easy-peasy';
import { Box } from '@chakra-ui/layout';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { BsPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { convertNumberToTime, timeAgo } from '../lib/formatTime';
import { SongModel } from '../lib/store';
// types
import { ISong } from '../types/song';

const SongTable = ({ songs }: { songs: ISong[] }) => {
  const { onActiveSongs, onActiveSong } = useStoreActions(
    (actions: Actions<SongModel>) => actions,
  );

  const handlePlay = (song?: ISong) => {
    onActiveSong(song ?? songs[0]);
    onActiveSongs(songs);
  };

  return (
    <Box padding="7" mb="8" bg="transparent" color="whiteAlpha.600">
      <IconButton
        icon={<BsPlayFill fontSize={30} style={{ marginLeft: '3px' }} />}
        aria-label="play song button"
        colorScheme="green"
        size="lg"
        isRound
        onClick={() => handlePlay()}
      />
      <TableContainer>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="whiteAlpha.400">
            <Tr textTransform="uppercase" cursor="pointer">
              <Th>#</Th>
              <Th>title</Th>
              <Th>album</Th>
              <Th>date added</Th>
              <Th>
                <AiOutlineClockCircle fontSize={16} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song) => (
              <Tr
                key={song.id}
                onClick={() => handlePlay(song)}
                cursor="pointer"
              >
                <Td isNumeric>{song.id}</Td>
                <Td color="whiteAlpha.800">{song.songName}</Td>
                <Td>-</Td>
                <Td>{timeAgo(song.createdAt)}</Td>
                <Td>{convertNumberToTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SongTable;
