import { PlayerActions } from './player-actions';
import ACTION_TYPES from './player-action-types';
import { PlayerState } from './player-state';

export const initPlayerState: PlayerState = {
    tracks: {},
    currentTrack: undefined
};

export const playerReducer = (state: PlayerState = initPlayerState, action: PlayerActions) => {
    let { currentTrack } = state;
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
            let playing = true;
            let paused = false;

            if (currentTrack && currentTrack.details.id === action.payload) {
                playing = !currentTrack.playing;
                paused = !currentTrack.paused;
            }

            return {
                ...state,
                currentTrack: {
                    details,
                    playing,
                    paused,
                    actionPending: true
                }
            };
        case (ACTION_TYPES.PLAY_PAUSE_TRACK_SUCCESS):
            return {
                ...state,
                currentTrack: {
                    ...currentTrack,
                    actionPending: false
                }
            };
        case (ACTION_TYPES.PLAY_PAUSE_TRACK_FAILURE):
            return {
                ...state,
                currentTrack: {
                    ...currentTrack,
                    playing: !currentTrack.playing,
                    paused: !currentTrack.paused,
                    actionPending: false
                }
            };
        default:
            return state;
    }
}
