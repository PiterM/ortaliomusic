import { PlayerState } from '../containers/player/player-state';
import { CartState } from '../containers/cart/cart-state';
import { GlobalState } from '../common/models';

export interface StoreState {
    player: PlayerState;
    cart: CartState;
    global: GlobalState;
}