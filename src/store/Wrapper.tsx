import * as React from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import SnipcartProvider from '../snipcart/SnipcartProvider';
import Player from '../containers/player/player';

export default ({ element }: any) => {
  return (
    <Provider store={store}>
      <SnipcartProvider>
        {element}
        <Player />
      </SnipcartProvider>
    </Provider>
  );
};