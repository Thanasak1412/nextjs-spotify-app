import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// config
import { jwtSecretKey } from '../../config';
// lib
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({
        status: true,
        message: 'User not found',
      });
      return;
    }

    const matchedPassword = bcrypt.compareSync(password, user.password);

    if (!matchedPassword) {
      res.status(400).json({
        status: true,
        message: 'Password is invalid',
      });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      jwtSecretKey,
      {
        expiresIn: '8h',
      },
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      }),
    );

    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error || 'Email already exist',
    });
  }
};
