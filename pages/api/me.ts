import { validateRoute } from '../../lib/validateRoute';

export default validateRoute((_, res, user) => {
  res.status(200).json({
    status: true,
    data: user,
  });
});
