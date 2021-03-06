import { PlayerActions } from './player-actions';
import ACTION_TYPES from './player-action-types';
import { PlayerState } from './player-state';
import { TrackPlayStatus } from '../track/track-models';
import { LoopMode } from './player-constants';

export const initPlayerState: PlayerState = {
    tracks: {},
    muted: false,
    currentTrack: undefined,
    loopMode: LoopMode.Off
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
            let actionPending = true;
            let progress;
            let muted;
            playing = true;
            paused = false;
            status = TrackPlayStatus.Loading;

            if (currentTrack && currentTrack.details.id === action.payload) {
                playing = !currentTrack.playing;
                paused = !currentTrack.paused;
                progress = currentTrack.progress;
                actionPending = false;
                muted = state.muted;
                status = playing ? TrackPlayStatus.Playing 
                    : (paused ? TrackPlayStatus.Paused : TrackPlayStatus.None);
            } else {
                progress = {
                    data: {},
                    fraction: 0,
                    seeking: false,
                };
                muted = false;
            }

            return {
                ...state,
                muted,
                currentTrack: {
                    ...currentTrack,
                    details,
                    playing,
                    paused,
                    actionPending,
                    status,
                    progress,
                }
            };
        case (ACTION_TYPES.PLAY_PAUSE_TRACK_SUCCESS):
            if (!currentTrack) {
                return state;
            }

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
            if (!currentTrack) {
                return state;
            }

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
        case (ACTION_TYPES.SET_TRACK_PROGRESS):
            if (!currentTrack) {
                return state;
            }

            return {
                ...state,
                currentTrack: {
                    ...state.currentTrack,
                    progress: {
                        data: action.payload,
                        fraction: action.payload.played,
                        seeking: false
                    }
                }
            };   
        case (ACTION_TYPES.TRACK_SEEK_TO):
            if (!currentTrack) {
                return state;
            }

            return {
                ...state,
                currentTrack: {
                    ...state.currentTrack,
                    progress: {
                        ...state.currentTrack.progress,
                        fraction: action.payload,
                        seeking: true
                    }
                }
            };   
        case (ACTION_TYPES.TRACK_SEEK_TO_SUCCESS):
            if (!currentTrack) {
                return state;
            }

            return {
                ...state,
                currentTrack: {
                    ...state.currentTrack,
                    progress: {
                        ...state.currentTrack.progress,
                        seeking: false
                    }
                }
            };    
        case (ACTION_TYPES.TOGGLE_VOLUME):
            return {
                ...state,
                muted: !state.muted
            };  
            
        case (ACTION_TYPES.SET_LOOP_MODE):
            const currentLoopMode = state.loopMode;
            let loopMode = LoopMode.Off;
            switch (currentLoopMode) {
                case (LoopMode.Off):
                    loopMode = LoopMode.LoopAll;
                    break;
                case (LoopMode.LoopAll):
                    loopMode = LoopMode.LoopOne;
                    break;
                default:
                case (LoopMode.LoopOne):
                    loopMode = LoopMode.Off;
            }
            return {
                ...state,
                loopMode
            };   
        default:
            return state;
    }
}
