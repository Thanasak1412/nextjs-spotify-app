import prisma from '../../lib/prisma';
import { validateRoute } from '../../lib/validateRoute';

export default validateRoute(async (_, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.status(200).json({
    status: true,
    data: { ...user, playlistsCount },
  });
});
