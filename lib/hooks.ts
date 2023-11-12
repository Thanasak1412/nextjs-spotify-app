import { Playlist, User } from '@prisma/client';
import useSWR from 'swr';
import fetcher from './fetcher';

interface IUser extends User {
  playlistsCount: number;
}

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher);

  return {
    user: data?.data as IUser,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher);

  return {
    playlists: (data?.data as Playlist[]) || [],
    isLoading: !data?.data && !error,
    isError: error,
  };
};
