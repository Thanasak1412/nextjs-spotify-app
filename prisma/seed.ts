import { PrismaClient } from 'prisma/prisma-client';
import bcrypt from 'bcrypt';
import { artistsData } from './songsData';

const prisma = new PrismaClient({
  log: ['query', 'info'],
});

const run = async () => {
  await Promise.all(
    artistsData.map((artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              songName: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    }),
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'email@test.com' },
    update: {},
    create: {
      email: 'email@test.com',
      password: bcrypt.hashSync('password', salt),
      firstName: 'Thanasak',
      lastName: 'Srisaeng',
    },
  });

  const songs = await prisma.song.findMany({});

  await Promise.all(
    [...Array(10)].map(async (_, i) => {
      await prisma.playlist.create({
        data: {
          playlistName: `Playlist #${i}`,
          song: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),
  );
};

run().catch(async (e) => {
  // eslint-disable-next-line no-console
  console.error('Error', e);
  await prisma.$disconnect();
  process.exit(1);
});
