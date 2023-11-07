import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// lib
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  const secretKey = process.env.JWT_SECRET;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(401).json({
      status: false,
      message: 'User already exist',
    });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    secretKey,
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

  res.status(201).json({
    status: true,
    data: user,
  });
};
