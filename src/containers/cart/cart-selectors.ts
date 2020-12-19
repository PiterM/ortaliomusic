import { cartReducer } from './cart-reducer';
import { StoreState } from '../../store/StoreState';

export const getCartItems = ({ cart }: StoreState) => cart?.items;
export const getCartQuantity = ({ cart }: StoreState) => cart?.quantity;