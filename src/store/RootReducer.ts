import { combineReducers } from 'redux';
import { playerReducer } from '../containers/player/player-reducers';
import { cartReducer } from '../containers/cart/cart-reducer';
import { globalReducer } from '../pages/global/global-reducer';

const rootReducer = combineReducers(
    {
        player: playerReducer,
        cart: cartReducer,
        global: globalReducer,
    }
);

export default rootReducer;
