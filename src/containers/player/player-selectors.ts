import { StoreState } from '../../store/StoreState';

export const getCurrentTrack = ({ player: { currentTrack }}: StoreState) => currentTrack;
export const getTracks = ({ player: { tracks }}: StoreState) => tracks;