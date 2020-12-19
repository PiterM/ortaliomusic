import ACTION_TYPES from './player-action-types';

export interface SetTracksData {
    type: ACTION_TYPES.SET_TRACKS_DATA;
    payload: any;
}

export const setTracksData = (tracks: any): SetTracksData => ({
    type: ACTION_TYPES.SET_TRACKS_DATA,
    payload: tracks
});

export interface PlayPauseTrack {
    type: ACTION_TYPES.PLAY_PAUSE_TRACK;
    payload: string;
}

export const playPauseTrack = (payload: string): PlayPauseTrack => ({
    type: ACTION_TYPES.PLAY_PAUSE_TRACK,
    payload
});

export interface PlayPauseTrackSuccess {
    type: ACTION_TYPES.PLAY_PAUSE_TRACK_SUCCESS;
}

export const playPauseTrackSuccess = (): PlayPauseTrackSuccess => ({
    type: ACTION_TYPES.PLAY_PAUSE_TRACK_SUCCESS,
});

export interface PlayPauseTrackFailure {
    type: ACTION_TYPES.PLAY_PAUSE_TRACK_FAILURE;
}

export const playPauseTrackFailure = (): PlayPauseTrackFailure => ({
    type: ACTION_TYPES.PLAY_PAUSE_TRACK_FAILURE,
});

export type PlayerActions = 
    | SetTracksData
    | PlayPauseTrack
    | PlayPauseTrackSuccess
    | PlayPauseTrackFailure;