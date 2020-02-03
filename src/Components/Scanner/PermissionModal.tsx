import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import Colors from '../../Utils/Colors';

interface IProps {
  isVisible: boolean;
}

const PermissionModal = ({isVisible}: IProps) => {
  const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AnimatedIcon
            animation="swing"
            iterationDelay={2500}
            iterationCount="infinite"
            style={styles.image}
            name="md-camera"
            size={30}
            color="#fff"
          />
          <Text style={styles.title}>Camera Unavailable</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.text}>
            {'Allow FSB to access your camera in order to use it'}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('close')}>
            <Text>{'CLOSE'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('param')}>
            <Text>{'PARAMETERS'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    maxHeight: '35%',
  },
  header: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  title: {
    color: Colors.white,
    marginLeft: 10,
    fontSize: 15,
  },
  text: {
    padding: 15,
  },
  middle: {
    flex: 2,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
});

export default PermissionModal;
