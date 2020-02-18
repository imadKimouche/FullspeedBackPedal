/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import {Store} from './store/configureStore';
import RootNavigator from './navigation/RootNavigator';

export default () => (
  <Provider store={Store}>
    <RootNavigator />
  </Provider>
);
