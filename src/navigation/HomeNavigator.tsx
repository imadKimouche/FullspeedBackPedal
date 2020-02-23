import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import React from 'react';

import GlossaryNavigatorContent from '../navigation/GlossaryNavigator';
import ScannerNavigator from './ScannerNavigator';
import Account from '../Views/Account';
import Colors from '../Utils/Colors';

interface IProps {
  name: string;
  focused: boolean;
}

const HomeNavigatorIcon = ({name, focused}: IProps) => {
  return (
    <Icon
      name={name}
      size={20}
      iconStyle={{
        marginTop: 10
      }}
      type="font-awesome"
      color={focused ? Colors.secondaryLight : 'grey'}
    />
  );
};

const TabNavigatorContent = createBottomTabNavigator(
  {
    Glossary: {
      screen: GlossaryNavigatorContent,
      navigationOptions: {
        title: 'Glossaire',
        tabBarIcon: ({focused}) => (
          <HomeNavigatorIcon name="list-ul" focused={focused} />
        )
      }
    },
    ScannerNavigator: {
      screen: ScannerNavigator,
      navigationOptions: {
        title: 'Scanner',
        tabBarIcon: ({focused}) => (
          <HomeNavigatorIcon name="camera" focused={focused} />
        )
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'Profil',
        tabBarIcon: ({focused}) => (
          <HomeNavigatorIcon name="user" focused={focused} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.secondaryLight
    }
  }
);

const TabNavigator = createAppContainer(TabNavigatorContent);

export default TabNavigator;
