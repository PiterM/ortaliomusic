import ACTION_TYPES from './player-action-types';

export interface SetTracksData {
    type: ACTION_TYPES.SET_TRACKS_DATA;
    payload: any;
}

export const setTracksData = (tracks: any): SetTracksData => ({
    type: ACTION_TYPES.SET_TRACKS_DATA,
    payload: tracks
});