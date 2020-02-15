import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Colors from '../Utils/Colors';
import {StyleSheet, StyleProp, TextStyle} from 'react-native';

interface IProps {
  style: StyleProp<TextStyle>;
}

const BugIndicator = (props: IProps) => {
  const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

  return (
    <AnimatedIcon
      style={props.style}
      animation="tada"
      iterationCount="infinite"
      name="md-bug"
      size={30}
      color={Colors.pink}
    />
  );
};

export default BugIndicator;
