import { Artist, Playlist as PlaylistProps, Song } from '@prisma/client';
import { GetServerSideProps } from 'next';
// lib
import prisma from '../../lib/prisma';
import { validateToken } from '../../lib/auth';
// components
import GradientLayout from '../../components/gradientLayout';
import SongTable from '../../components/songTable';

type Props = {
  playlist: PlaylistProps & {
    song: (Song & {
      artist: Pick<Artist, 'name' | 'id'>;
    })[];
  };
};

const handleBgColor = (id: number) => {
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'teal',
    'cyan',
    'darkblue',
  ];

  return colors[id - 1] ?? colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }: Props) => {
  const color = handleBgColor(playlist.id);

  return (
    <GradientLayout
      color={color}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      title={playlist.playlistName}
      subtitle="Playlist"
      description={`${playlist.song.length} songs`}
      roundImage={false}
    >
      <SongTable songs={playlist.song} />
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let userId: number;

  try {
    userId = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId,
    },
    include: {
      song: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;
