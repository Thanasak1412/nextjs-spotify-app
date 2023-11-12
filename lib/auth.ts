import jwt from 'jsonwebtoken';
// config
import { jwtSecretKey } from '../config';
// types
import { IJwtPayload } from '../types/jwt';

export function validateToken(token: string) {
  if (!token) {
    return null;
  }

  const { id } = jwt.verify(token, jwtSecretKey) as IJwtPayload;

  return id;
}
