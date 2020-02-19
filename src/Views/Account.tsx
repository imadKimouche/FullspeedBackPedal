import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Input} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/Utility';
import Colors from '../Utils/Colors';
import ProfilePicturesModal from '../Components/ProfilePicturesModal';
import {API} from '../Utils/API';
import {Store, RootState} from '../store/configureStore';
import {logout, UserInfo} from '../store/actions/userActions';
import {connect} from 'react-redux';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  userInfo: UserInfo;
}

interface IState {
  isVisible: boolean;
  profilePicture: any;
}

class Account extends Component<IProps, IState> {
  versionNumber: string;
  constructor(props: IProps) {
    super(props);
    this.versionNumber = '0.0.1';

    this.state = {
      isVisible: false,
      profilePicture: '',
    };
  }

  componentDidMount() {
    this._loadProfilePicture();
  }

  _loadProfilePicture = async () => {
    try {
      const profilePicture = await AsyncStorage.getItem('profilePicture');
      if (profilePicture !== null) {
        this.setState({profilePicture});
      }
    } catch (error) {
      console.log(error);
    }
  };

  _setProfilePicture = async (picture: any) => {
    this.setState({
      isVisible: false,
      profilePicture: picture,
    });
    try {
      await AsyncStorage.setItem('profilePicture', picture.toString());
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
          closeModal={() => {
            this.setState({isVisible: false});
          }}
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
          <Input
            label="Username"
            labelStyle={styles.label}
            value={this.props.userInfo.username}
          />
          <Input
            label="Email"
            labelStyle={styles.label}
            value={this.props.userInfo.email}
          />
        </View>
        <Text
          style={[styles.clickableText, {color: Colors.danger}]}
          onPress={() => {
            Store.dispatch(logout(0));
            this.props.navigation.navigate('Login');
          }}>
          Log out
        </Text>
        <Text style={styles.infoText}>v {this.versionNumber}</Text>
      </View>
    );
  }
}

const mapStateToProps = function(state: RootState) {
  return {
    userInfo: state.userReducer.userInfo,
  };
};

const ConnectAccount = connect(mapStateToProps)(Account);

export default ConnectAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileLogo: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: (SCREEN_WIDTH * 0.3) / 2,
    alignSelf: 'center',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: (SCREEN_WIDTH * 0.3) / 2,
  },
  info: {
    marginTop: 25,
    alignSelf: 'center',
    flex: 1,
    opacity: 1,
    backgroundColor: 'rgba(50, 50, 50, 0)',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.95,
    maxHeight: SCREEN_HEIGHT * 0.5,
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
  infoText: {
    color: 'grey',
    marginTop: 40,
    marginLeft: 5,
    fontSize: 12,
  },
});
