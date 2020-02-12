/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Glossary from './Views/Glossary';
import Scanner from './Views/Scanner';
import Account from './Views/Account';
import ImagePreview from './Views/ImagePreview';

const ScannerNavigator = createStackNavigator({
  Scanner: {
    screen: Scanner,
    navigationOptions: {
      header: () => null,
    },
  },
  ImagePreview: {
    screen: ImagePreview,
    navigationOptions: {
      header: () => null,
    },
  },
});

const TabNavigator = createBottomTabNavigator({
  Glossary: Glossary,
  Scanner: ScannerNavigator,
  Account: Account,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
  },
});

export default createAppContainer(TabNavigator);
