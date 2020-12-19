import { UpdateCartData } from './cart-actions';
import ACTION_TYPES from './cart-action-types';
import { CartUpdatePayload } from './cart-models';
import { CartState } from './cart-state';

export const cartReducer = (state: CartState = null, action: UpdateCartData) => {
    switch (action.type) {
        case (ACTION_TYPES.UPDATE_CART_DATA):
            const { items, customer, cart }: CartUpdatePayload = action.payload;
            const newItems = items.map((item: any) => {
                const { description, id, image, name, price, quantity, uniqueId, url } = item;
                return { description, id, image, name, price, quantity, uniqueId, url };
            });
            return {
                items: newItems,
                quantity: items.reduce((total: number, item: any) => total + item.quantity, 0),
                customer,
                cartTotal: cart.total,
                cartSubTotal: cart.subtotal
            };
        default:
            return state;
    }
}