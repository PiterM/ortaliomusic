import { StoreState } from '../../store/StoreState';

export const getCurrentTrack = ({ player: { currentTrack }}: StoreState) => currentTrack;