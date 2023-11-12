import { Box, Grid, GridItem } from '@chakra-ui/layout';
import { ReactNode } from 'react';
// components
import Sidebar from './sidebar';
import PlayerBar from './playerBar';

type Props = {
  children: ReactNode;
};

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Grid
        height="100%"
        templateColumns="minmax(13.25rem, 1fr) 4fr"
        templateRows="90% 10%"
      >
        <Sidebar />
        <GridItem colSpan={2} rowSpan={1}>
          {children}
        </GridItem>
        <GridItem
          colSpan={3}
          rowSpan={2}
          bg="gray.900"
          padding="0.5rem 0.75rem"
        >
          <PlayerBar />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PlayerLayout;
