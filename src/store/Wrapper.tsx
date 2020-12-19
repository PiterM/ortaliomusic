import * as React from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import SnipcartProvider from '../snipcart/SnipcartProvider';

export default ({ element }: any) => {
  return (
    <Provider store={store}>
      <SnipcartProvider>
        {element}
      </SnipcartProvider>
    </Provider>
  );
};