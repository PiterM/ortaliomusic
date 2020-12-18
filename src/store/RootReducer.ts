import { combineReducers } from 'redux';
import { tracksReducer } from '../containers/player/player-reducers';

const playerReducer = combineReducers(
    {
        tracks: tracksReducer
    }
);

const rootReducer = combineReducers(
    {
        player: playerReducer,
    }
);

export default rootReducer;
