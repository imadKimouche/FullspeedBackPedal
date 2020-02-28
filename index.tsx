/**
 * @format
 */

import { KeepAwake, registerRootComponent } from 'expo';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

if (__DEV__) {
    KeepAwake.activate();
  }

  registerRootComponent(App);
