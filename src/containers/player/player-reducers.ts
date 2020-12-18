import { SetTracksData } from './player-actions';
import ACTION_TYPES from './player-action-types';
import { PlayerState } from './player-state';

export const initState: PlayerState = {
    tracks: [],
};

export const tracksReducer = (state: PlayerState = initState, action: SetTracksData) => {
    switch (action.type) {
        case (ACTION_TYPES.SET_TRACKS_DATA):
            const tracks = action.payload;
            let newState = [];
            if (tracks.length > 0) {
                newState = action.payload.map((item: any) => item.node);
            }
            return newState;
        default:
            return state;
    }
}