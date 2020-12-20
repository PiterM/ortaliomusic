import { combineReducers } from 'redux';
import { playerReducer } from '../containers/player/player-reducers';
import { cartReducer } from '../containers/cart/cart-reducer';

const rootReducer = combineReducers(
    {
        player: playerReducer,
        cart: cartReducer,
    }
);

export default rootReducer;
