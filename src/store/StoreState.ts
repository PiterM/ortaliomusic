import { PlayerState } from '../containers/player/player-state';
import { CartState } from '../containers/cart/cart-state';
import { SettingsState } from '../containers/tracks/settings-state';

export interface StoreState {
    player: PlayerState;
    cart: CartState;
    settings: SettingsState;
}