import React, {Component} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { Store, RootState } from '../store/configureStore';
import { userToken } from '../store/actions/userActions';
import FormInput from '../Components/FormInput';
import { SCREEN_HEIGHT, SCREEN_WIDTH, IS_DEBUG } from '../Utils/Utility';
import API from '../Utils/API'

interface IState {
  isLoading: boolean;
  username: string;
  email: string;
  password: string;
  confirmationPassword: string;
  emailValid: boolean;
  passwordValid: boolean;
  usernameValid: boolean;
  confirmationPasswordValid: boolean;
}

class Login extends Component<null, IState> {
  private usernameInput: React.RefObject<Input>;
  private emailInput: React.RefObject<Input>;
  private passwordInput: React.RefObject<Input>;
  private confirmationPasswordInput: React.RefObject<Input>;

  state: IState = {
    isLoading: false,
    username: '',
    email: '',
    password: '',
    confirmationPassword: '',
    emailValid: true,
    passwordValid: true,
    usernameValid: true,
    confirmationPasswordValid: true,
  };

  constructor(props: any) {
    super(props);
    this.usernameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.confirmationPasswordInput = React.createRef();
  }

  register = () => {
    const { email, password } = this.state;
    if (IS_DEBUG || (this.validateUsername()
        && this.validateEmail()
        && this.validatePassword()
        && this.validateConfirmationPassword())) {
      this.setState({ isLoading: true });
      API.post(`${API.url_register}`, {email, password})
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          Store.dispatch(userToken({ token: "token"}));
        }
        this.setState({ isLoading: false });
    })
    .catch(err => {
      this.setState({ isLoading: false });
      return err;
    });
    }
  };

  login = () => {
    const { email, password } = this.state;
    if (IS_DEBUG || (this.validateUsername()
        && this.validateEmail()
        && this.validatePassword()
        && this.validateConfirmationPassword())) {
      this.setState({ isLoading: true });
    }
  };

  validateUsername = () => {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    this.setState({ usernameValid });
    return usernameValid;
  };

  validateEmail = () => {
    const { email } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    this.setState({ emailValid });
    return emailValid;
  };

  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= 1;
    this.setState({ passwordValid });
    return passwordValid;
  };

  validateConfirmationPassword = () => {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    return confirmationPasswordValid;
  };

  render() {
    const {
      isLoading,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.formContainer}>
          <Text style={styles.signUpText}>Sign up</Text>
          <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>

          <View style={{width: '80%', alignItems: 'center'}}>
            <FormInput
              refInput={(input: any) => (this.usernameInput = input)}
              icon="user"
              value={username}
              onChangeText={(username: string) => this.setState({username})}
              placeholder="Username"
              returnKeyType="next"
              errorMessage={
                usernameValid ? null : "Your username can't be blank"
              }
              onSubmitEditing={() => {
                this.validateUsername();
                if (this.emailInput.current != null)
                  this.emailInput.current.focus();
              }}
            />
            <FormInput
              refInput={(input: any) => (this.emailInput = input)}
              icon="envelope"
              value={email}
              onChangeText={(email: string) => this.setState({email})}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={
                emailValid ? null : 'Please enter a valid email address'
              }
              onSubmitEditing={() => {
                this.validateEmail();
                if (this.passwordInput.current != null)
                  this.passwordInput.current.focus();
              }}
            />
            <FormInput
              refInput={(input: any) => (this.passwordInput = input)}
              icon="lock"
              value={password}
              onChangeText={(password: string) => this.setState({password})}
              placeholder="Password"
              secureTextEntry
              returnKeyType="next"
              errorMessage={
                passwordValid ? null : 'Please enter at least 8 characters'
              }
              onSubmitEditing={() => {
                this.validatePassword();
                if (this.confirmationPasswordInput.current != null)
                  this.confirmationPasswordInput.current.focus();
              }}
            />
            <FormInput
              refInput={(input: any) =>
                (this.confirmationPasswordInput = input)
              }
              icon="lock"
              value={confirmationPassword}
              onChangeText={(confirmationPassword: string) =>
                this.setState({confirmationPassword})
              }
              placeholder="Confirm Password"
              secureTextEntry
              errorMessage={
                confirmationPasswordValid
                  ? null
                  : 'The password fields are not identics'
              }
              returnKeyType="go"
              onSubmitEditing={() => {
                this.validateConfirmationPassword();
                this.register();
              }}
            />
          </View>
          <Button
            loading={isLoading}
            title="SIGNUP"
            containerStyle={{flex: -1}}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={this.register}
            disabled={isLoading}
          />
        </KeyboardAvoidingView>
        <View style={styles.loginHereContainer}>
          <Text style={styles.alreadyAccountText}>
            Already have an account.
          </Text>
          <Button
            title="Login here"
            titleStyle={styles.loginHereText}
            containerStyle={{flex: -1}}
            buttonStyle={{backgroundColor: 'transparent'}}
            //underlayColor="transparent"
            onPress={() => Alert.alert('🔥', 'You can login here')}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = function(state : RootState) {
  return {
    isLoading: (state.userReducer.token === "") ? false : true,
  }
}

const ConnectLogin = connect(
  mapStateToProps,
  null
)(Login)

export default ConnectLogin;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'UbuntuLight',
  },
  whoAreYouText: {
    color: '#7384B4',
    fontFamily: 'UbuntuBold',
    fontSize: 14,
  },
  signUpButtonText: {
    fontFamily: 'UbuntuBold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontFamily: 'UbuntuLightItalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'UbuntuLightItalic',
    fontSize: 12,
  },
});
