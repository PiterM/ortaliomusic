import ACTION_TYPES from './player-action-types';

export interface SetTracksData {
    type: ACTION_TYPES.SET_TRACKS_DATA;
    payload: any;
}

export const setTracksData = (payload: any): SetTracksData => ({
    type: ACTION_TYPES.SET_TRACKS_DATA,
    payload
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

export interface StopPlayback {
    type: ACTION_TYPES.STOP_PLAYBACK;
}

export const stopPlayback = (): StopPlayback => ({
    type: ACTION_TYPES.STOP_PLAYBACK,
});

export interface SetTrackProgress {
    type: ACTION_TYPES.SET_TRACK_PROGRESS;
    payload: any;
}

export const setTrackProgress = (payload: any): SetTrackProgress => ({
    type: ACTION_TYPES.SET_TRACK_PROGRESS,
    payload
});

export interface TrackSeekTo {
    type: ACTION_TYPES.TRACK_SEEK_TO;
    payload: number;
}

export const trackSeekTo = (payload: number): TrackSeekTo => ({
    type: ACTION_TYPES.TRACK_SEEK_TO,
    payload
});

export interface TrackSeekToSuccess {
    type: ACTION_TYPES.TRACK_SEEK_TO_SUCCESS;
}

export const trackSeekToSuccess = (): TrackSeekToSuccess => ({
    type: ACTION_TYPES.TRACK_SEEK_TO_SUCCESS,
});

export interface TogglePlayerVolume {
    type: ACTION_TYPES.TOGGLE_VOLUME;
}

export const togglePlayerVolume = (): TogglePlayerVolume => ({
    type: ACTION_TYPES.TOGGLE_VOLUME
});

export type PlayerActions = 
    | SetTracksData
    | PlayPauseTrack
    | PlayPauseTrackSuccess
    | PlayPauseTrackFailure
    | StopPlayback
    | SetTrackProgress
    | TrackSeekTo
    | TrackSeekToSuccess
    | TogglePlayerVolume;