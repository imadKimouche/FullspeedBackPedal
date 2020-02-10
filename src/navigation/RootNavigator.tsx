
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from '../Views/Login';
import HomeNavigator from './HomeNavigator';

const LoginNavigatorContent = createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        header: () => null,
      },
    },
    MainNavigation: {
      screen: HomeNavigator,
      navigationOptions: {
        header: () => null,
      },
    },
  });

const LoginNavigator = createAppContainer(LoginNavigatorContent);

export default LoginNavigator;