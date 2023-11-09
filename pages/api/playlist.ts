import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/validateRoute';

export default validateRoute(async (_, res, user) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        playlistName: 'asc',
      },
    });

    res.status(200).json({
      status: true,
      data: playlists,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    res.status(400).json({
      status: false,
      message: 'Failed to get playlist',
    });
  }
});
