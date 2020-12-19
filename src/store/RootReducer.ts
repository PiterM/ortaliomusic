import { combineReducers } from 'redux';
import { tracksReducer } from '../containers/player/player-reducers';
import { cartReducer } from '../containers/cart/cart-reducer';

const playerReducer = combineReducers(
    {
        tracks: tracksReducer
    }
);

const rootReducer = combineReducers(
    {
        player: playerReducer,
        cart: cartReducer,
    }
);

export default rootReducer;
