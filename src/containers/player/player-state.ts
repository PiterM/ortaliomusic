export type TracksState = any;

export interface CurrentTrackState {
    details: any;
    playing: boolean;
    paused: boolean;
    actionPending: boolean;
}

export interface PlayerState {
    tracks: TracksState;
    currentTrack?: CurrentTrackState;
}