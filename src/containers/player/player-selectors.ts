import { StoreState } from '../../store/StoreState';

export const getCurrentTrack = ({ player: { currentTrack }}: StoreState) => currentTrack;
export const getCurrentTrackProgress = ({ player: { currentTrack: { progress } }}: StoreState) => progress;
export const getTracks = ({ player: { tracks }}: StoreState) => tracks;
export const getPlayerMuted = ({ player: { muted }}: StoreState) => muted;