import { Artist, Song } from '@prisma/client';
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

type Props = {
  songs: (Song & {
    artist: Pick<Artist, 'name' | 'id'>;
  })[];
};

const SongTable = ({ songs }: Props) => {
  return (
    <Box padding="7" mb="8" bg="transparent" color="whiteAlpha.600">
      <IconButton
        icon={<BsPlayFill fontSize={30} style={{ marginLeft: '3px' }} />}
        aria-label="play song button"
        colorScheme="green"
        size="lg"
        isRound
      />
      <TableContainer>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="whiteAlpha.400">
            <Tr textTransform="uppercase">
              <Th>#</Th>
              <Th>title</Th>
              <Th>album</Th>
              <Th>date added</Th>
              <Th sx={{ textAlign: '-webkit-center' }}>
                <AiOutlineClockCircle fontSize={16} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song) => (
              <Tr key={song.id}>
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
