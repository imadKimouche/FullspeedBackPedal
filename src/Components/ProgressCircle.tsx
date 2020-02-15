import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../Utils/Colors';

interface IProps {
  animating: boolean;
}

const ProgressCircle = ({animating}: IProps) => {
  return (
    <ActivityIndicator
      style={styles.container}
      size={80}
      color={Colors.pink}
      animating={animating}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
});

export default ProgressCircle;
