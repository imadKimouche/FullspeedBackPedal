import React from 'react';
import Login from '../Views/Login';
import HomeNavigator from './HomeNavigator';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

export const CreateRootNavigator = (isLogged?: boolean) => {
  const RootNavigatorContent = createStackNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: {
          header: () => null
        }
      },
      HomeNavigator: {
        screen: HomeNavigator,
        navigationOptions: {
          header: () => null
        }
      }
    },
    {
      initialRouteName: isLogged ? 'HomeNavigator' : 'Login'
    }
  );
  return createAppContainer(RootNavigatorContent);
};
