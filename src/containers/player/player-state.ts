import { TrackPlayStatus } from "../track/track-models";

export type TracksState = any;

export interface CurrentTrackState {
    details: any;
    playing: boolean;
    paused: boolean;
    actionPending: boolean;
    status: TrackPlayStatus;
}

export interface PlayerState {
    tracks: TracksState;
    currentTrack?: CurrentTrackState;
}