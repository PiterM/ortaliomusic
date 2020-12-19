import ACTION_TYPES from './cart-action-types';
import { CartUpdatePayload } from './cart-models';

export interface UpdateCartData {
    type: ACTION_TYPES.UPDATE_CART_DATA;
    payload: any;
}

export const updateCartData = (payload: CartUpdatePayload): UpdateCartData => ({
    type: ACTION_TYPES.UPDATE_CART_DATA,
    payload
});