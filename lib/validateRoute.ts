import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from './prisma';
// config
import { jwtSecretKey } from '../config';

interface IJwtPayload extends JwtPayload {
  email: string;
  id: number;
  time: number;
}

type HandlerType = (
  // eslint-disable-next-line no-unused-vars
  req: NextApiRequest,
  // eslint-disable-next-line no-unused-vars
  res: NextApiResponse,
  // eslint-disable-next-line no-unused-vars
  user: User,
) => void | Promise<void>;

export function validateRoute(handler: HandlerType) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    let user: User;

    try {
      if (!token) {
        res.status(401).json({
          status: false,
          message: 'Unauthorized',
        });
        return;
      }

      const { id } = jwt.verify(token, jwtSecretKey) as IJwtPayload;

      if (!id) {
        res.status(401).json({
          status: false,
          message: 'Token is invalid',
        });

        return;
      }

      user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        res.status(401).json({
          status: false,
          message: 'Unauthorized',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(401).json({
        status: false,
        message: 'Unauthorized',
      });
    }

    return handler(req, res, user);
  };
}
