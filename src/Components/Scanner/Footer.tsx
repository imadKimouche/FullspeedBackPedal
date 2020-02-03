import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '../../Utils/Colors';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text>footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
});

export default Footer;
