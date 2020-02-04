import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../Utils/Colors';

export default class Glossary extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Glossary</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
