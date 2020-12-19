import { combineReducers } from 'redux';
import { tracksReducer } from '../containers/player/player-reducers';
import { cartReducer } from '../containers/cart/cart-reducer';
import { settingsReducer } from '../containers/tracks/settings-reducer';

const playerReducer = combineReducers(
    {
        tracks: tracksReducer
    }
);

const rootReducer = combineReducers(
    {
        player: playerReducer,
        cart: cartReducer,
        settings: settingsReducer,
    }
);

export default rootReducer;
