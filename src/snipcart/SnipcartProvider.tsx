import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateCartData } from '../containers/cart/cart-actions';
const { useEffect } = React;

const SnipcartProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  const reviseItemsQuantities = async (items: any) => {
    for (const item of items) {
      const { Snipcart }: any = window;
      const { quantity, uniqueId } = item;
      if (quantity > 1 && uniqueId) {
        await Snipcart.api.cart.items.update({ uniqueId, quantity: 1 });
      }
    }
  }

  const handleSnipcart = () => {
    const { Snipcart }: any = window;
    if (Snipcart !== undefined) {
      Snipcart.DEBUG = true;  

      const listenSnipcart = () => {
        const { customer, cart } = Snipcart.store.getState();
        const items = cart.items.length !== undefined ? cart.items : cart.items.items;
        reviseItemsQuantities(items);

        dispatch(updateCartData({ items, customer, cart }));
      };
      const unsubscribe = Snipcart.store.subscribe(listenSnipcart);
      listenSnipcart();
      return () => unsubscribe();
    } 
  }

  useEffect(() => {
    handleSnipcart();
    document.addEventListener('snipcart.ready', () => {
      handleSnipcart();
    });
  }, []);

  return children;
};

export default SnipcartProvider;