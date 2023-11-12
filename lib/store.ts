import { createStore, action, Action, Store } from 'easy-peasy';
// types
import { ISong } from '../types/song';

export interface SongModel {
  activeSongs: ISong[];
  activeSong: ISong | null;
  onActiveSongs: Action<SongModel, ISong[]>;
  onActiveSong: Action<SongModel, ISong>;
}

const store: Store<SongModel> = createStore({
  activeSongs: [],
  activeSong: null,
  onActiveSongs: action((state, payload: ISong[]) => {
    state.activeSongs = payload;
  }),
  onActiveSong: action((state, payload: ISong) => {
    state.activeSong = payload;
  }),
});

export default store;
