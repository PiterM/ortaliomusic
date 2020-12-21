import { PlayerActions } from './player-actions';
import ACTION_TYPES from './player-action-types';
import { PlayerState } from './player-state';
import { TrackPlayStatus } from '../track/track-models';

export const initPlayerState: PlayerState = {
    tracks: {},
    currentTrack: undefined
};

export const playerReducer = (state: PlayerState = initPlayerState, action: PlayerActions) => {
    let { currentTrack } = state;
    let status, playing, paused;

    switch (action.type) {
        case (ACTION_TYPES.SET_TRACKS_DATA):
            const tracksFromApi = action.payload;
            let tracks: any = {};
            if (tracksFromApi.length > 0) {
                tracksFromApi.forEach((item: any) => {
                    tracks[item.node.id] = item.node;
                });
            }
            return { 
                ...state,
                tracks 
            };
        case (ACTION_TYPES.PLAY_PAUSE_TRACK):
            let details = state.tracks[action.payload];                
            playing = true;
            paused = false;

            if (currentTrack && currentTrack.details.id === action.payload) {
                playing = !currentTrack.playing;
                paused = !currentTrack.paused;
            }
            status = TrackPlayStatus.Loading;

            return {
                ...state,
                currentTrack: {
                    details,
                    playing,
                    paused,
                    actionPending: true,
                    status,
                }
            };
        case (ACTION_TYPES.PLAY_PAUSE_TRACK_SUCCESS):
            playing = state.currentTrack.playing;
            paused = state.currentTrack.paused;

            status = playing ? TrackPlayStatus.Playing 
                : (paused ? TrackPlayStatus.Paused : TrackPlayStatus.None);
            
            return {
                ...state,
                currentTrack: {
                    ...currentTrack,
                    actionPending: false,
                    status
                }
            };
        case (ACTION_TYPES.PLAY_PAUSE_TRACK_FAILURE):
            status = playing ? TrackPlayStatus.Paused 
            : (paused ? TrackPlayStatus.Playing : TrackPlayStatus.None);

            return {
                ...state,
                currentTrack: {
                    ...currentTrack,
                    playing: !currentTrack.playing,
                    paused: !currentTrack.paused,
                    actionPending: false,
                    status
                }
            };
        case (ACTION_TYPES.STOP_PLAYBACK):
            return {
                ...state,
                currentTrack: undefined
            };            
        default:
            return state;
    }
}
