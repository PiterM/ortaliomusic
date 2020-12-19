import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateCartData } from '../containers/cart/cart-actions';
const { useEffect } = React;

const SnipcartProvider = (props: any) => {
  const dispatch = useDispatch();

  const reviseItemsQuantities = async (items: any) => {
    for (const item of items) {
      const { Snipcart }: any = window;
      const { quantity, uniqueId } = item;
      if (quantity > 1 && uniqueId) {
        await Snipcart.api.cart.items.update({
          uniqueId,
          quantity: 1
        });
      }
    }
  }

  useEffect(() => {
    const { Snipcart }: any = window;
    if (Snipcart !== undefined) {
      Snipcart.DEBUG = true;
      // update state infos on change
      const listenSnipcart = () => {
        const { customer, cart } = Snipcart.store.getState();
        // get quantity in cart
        // changed after v 3.0.12
        const items = cart.items.length !== undefined ? cart.items : cart.items.items;
        reviseItemsQuantities(items);

        dispatch(updateCartData(
          {
            items, customer, cart
          }
        ));
      };
      // listen store update
      const unsubscribe = Snipcart.store.subscribe(listenSnipcart);
      // call first
      listenSnipcart();
      return () => unsubscribe();
    } 
  }, [props, dispatch]);

  return props.children;
};

export default SnipcartProvider;