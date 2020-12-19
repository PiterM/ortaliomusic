import { PlayerState } from '../containers/player/player-state';
import { CartState } from '../containers/cart/cart-state';

export interface StoreState {
    player: PlayerState;
    cart: CartState;
}