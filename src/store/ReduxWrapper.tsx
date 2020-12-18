import * as React from 'react';
import { Provider } from 'react-redux';
import store from './Store';

export default ({ element }: any) => {
  return <Provider store={store}>{element}</Provider>
};