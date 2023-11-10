import { Artist } from '@prisma/client';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
// lib
import prisma from '../lib/prisma';
// components
import GradientLayout from '../components/gradientLayout';

type Props = {
  artists: Artist[];
};

const Home = ({ artists }: Props) => {
  console.log('artists => ', artists);

  return (
    <GradientLayout
      color="gray"
      image="/profile.jpeg"
      title="Thanasak Srisaeng"
      subtitle="Profile"
      description="15 Public Playlists"
      roundImage
      sx={{ objectPosition: '60%', mixBlendMode: 'luminosity' }}
    >
      <Box padding="8">
        <Box marginBottom={8}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            Top artists this month
          </Text>
          <Text fontSize="sm" color="gray.400">
            Only visible to you
          </Text>
        </Box>
        <Flex flexWrap="wrap" gap={8}>
          {artists.map((artist, i) => (
            <Box
              width="20%"
              minHeight={60}
              padding={3}
              bg="gray.600"
              mixBlendMode="hard-light"
              borderRadius={8}
              key={artist.id}
            >
              <Image
                src={`https://reqres.in/img/faces/${i + 7}-image.jpg`}
                width="100%"
                objectFit="cover"
                borderRadius="100%"
              />
              <Box marginTop={2}>
                <Text fontSize="md" color="whiteAlpha.800" fontWeight="bold">
                  {artist.name}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.600">
                  Artist
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists,
    },
  };
};

export default Home;
