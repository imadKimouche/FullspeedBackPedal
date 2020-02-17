import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Input} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/Utility';
import Colors from '../Utils/Colors';
import ProfilePicturesModal from '../Components/ProfilePicturesModal';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  infoChanged: boolean;
  isVisible: boolean;
  profilePicture: any;
}

export default class Glossary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      infoChanged: false,
      isVisible: false,
      profilePicture: '',
    };
  }

  _setProfilePicture = async (picture: any) => {
    this.setState({
      isVisible: false,
      profilePicture: picture,
    });
    try {
      await AsyncStorage.setItem('profilePicture', picture);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ProfilePicturesModal
          isVisible={this.state.isVisible}
          setProfilePicture={this._setProfilePicture}
        />
        <TouchableOpacity style={styles.profileLogo}>
          <Image
            style={styles.profilePicture}
            resizeMode="center"
            source={this.state.profilePicture}
          />
        </TouchableOpacity>
        <Text
          style={styles.clickableText}
          onPress={() => {
            this.setState({isVisible: true});
          }}>
          Update profile picture
        </Text>
        <View style={styles.info}>
          <Input label="Username" labelStyle={styles.label} />
          <Input label="Email" labelStyle={styles.label} />
        </View>
        <Text
          style={
            this.state.infoChanged ? styles.clickableText : styles.inactiveText
          }>
          Update profile information
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileLogo: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: (SCREEN_WIDTH * 0.3) / 2,
    backgroundColor: Colors.pink,
    alignSelf: 'center',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: SCREEN_WIDTH * 0.22,
    height: SCREEN_WIDTH * 0.22,
  },
  info: {
    marginTop: 25,
    alignSelf: 'center',
    flex: 1,
    opacity: 1,
    backgroundColor: 'rgba(200, 10, 50, 0.1)',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.95,
    maxHeight: SCREEN_HEIGHT * 0.54,
    padding: 10,
  },
  clickableText: {
    marginTop: 14,
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
  inactiveText: {
    color: 'grey',
    marginTop: 14,
    textAlign: 'center',
    fontSize: 16,
  },
  label: {
    color: Colors.black,
    fontWeight: 'normal',
    fontFamily: 'Montserrat-Light',
  },
});
