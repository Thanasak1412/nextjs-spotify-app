import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  email: string;
  id: number;
  time: number;
}
