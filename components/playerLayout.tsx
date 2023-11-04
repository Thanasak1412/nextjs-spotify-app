import { Box } from '@chakra-ui/layout';
import { ReactNode } from 'react';
// components
import Sidebar from './sidebar';

type Props = {
  children: ReactNode;
};

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box width="250px" position="absolute" top={0} left={0}>
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>

      <Box position="absolute" bottom={0} left={0}>
        Music bar
      </Box>
    </Box>
  );
};

export default PlayerLayout;
