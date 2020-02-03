import React from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import {Images} from '../../Utils/Images';
import Colors from '../../Utils/Colors';

interface IProps {
  isVisible: boolean;
}

const PermissionModal = ({isVisible}: IProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={Images.cameraUnavailable}
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
