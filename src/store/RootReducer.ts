import { combineReducers } from 'redux';
import { playerReducer } from '../containers/player/player-reducers';
import { cartReducer } from '../containers/cart/cart-reducer';
import { globalReducer } from '../common/global/global-reducer';

const rootReducer = combineReducers(
    {
        player: playerReducer,
        cart: cartReducer,
        global: globalReducer,
    }
);

export default rootReducer;
