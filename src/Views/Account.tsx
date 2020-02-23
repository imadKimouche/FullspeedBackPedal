import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import {NavigationScreenProp} from 'react-navigation';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Utils/Utility';
import Colors from '../Utils/Colors';
import ProfilePicturesModal from '../Components/ProfilePicturesModal';
import {API} from '../Utils/API';
import {Store, RootState} from '../store/configureStore';
import {logout, UserInfo} from '../store/actions/userActions';
import {connect} from 'react-redux';
import FormInput from '../Components/FormInput';
import {Images} from '../Utils/Images';

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
      profilePicture: Images.poro_1
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
      profilePicture: picture
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
        <View style={styles.headerContainer}>
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
        </View>
        <View style={styles.info}>
          <FormInput
            editable={false}
            icon="user"
            placeholder={this.props.userInfo.username}></FormInput>
          <FormInput
            editable={false}
            icon="envelope"
            placeholder={this.props.userInfo.email}></FormInput>
        </View>
        <Button
          buttonStyle={styles.logoutButton}
          titleStyle={styles.logoutButtonText}
          onPress={() => {
            Store.dispatch(logout(0));
            this.props.navigation.navigate('Login');
          }}
          title="
          Log out"
        />
        <Text style={styles.infoText}>v {this.versionNumber}</Text>
      </View>
    );
  }
}

const mapStateToProps = function(state: RootState) {
  return {
    userInfo: state.userReducer.userInfo
  };
};

const ConnectAccount = connect(mapStateToProps)(Account);

export default ConnectAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileLogo: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: (SCREEN_WIDTH * 0.3) / 2,
    alignSelf: 'center',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: Colors.secondaryLight,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.black
  },
  profilePicture: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: (SCREEN_WIDTH * 0.3) / 2
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
    padding: 10
  },
  clickableText: {
    marginTop: 14,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16
  },
  inactiveText: {
    color: 'grey',
    marginTop: 14,
    textAlign: 'center',
    fontSize: 16
  },
  label: {
    color: Colors.black,
    fontWeight: 'normal',
    fontFamily: 'Montserrat-Light'
  },
  infoText: {
    color: Colors.secondaryTexta,
    marginTop: 40,
    marginLeft: 5,
    fontSize: 12
  },
  logoutButton: {
    backgroundColor: Colors.danger,
    alignSelf: 'center',
    width: 250,
    borderRadius: 250,
    height: 45
  },
  logoutButtonText: {
    fontFamily: 'UbuntuBold',
    fontSize: 13
  }
});
