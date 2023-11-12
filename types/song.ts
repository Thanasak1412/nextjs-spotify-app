import { Artist, Song } from '@prisma/client';

export interface ISong extends Song {
  artist: Pick<Artist, 'name' | 'id'>;
}
