import { combineReducers } from 'redux';
import { playerReducer } from '../containers/player/player-reducers';
import { cartReducer } from '../containers/cart/cart-reducer';
import { settingsReducer } from '../containers/tracks/settings-reducer';

const rootReducer = combineReducers(
    {
        player: playerReducer,
        cart: cartReducer,
        settings: settingsReducer,
    }
);

export default rootReducer;
