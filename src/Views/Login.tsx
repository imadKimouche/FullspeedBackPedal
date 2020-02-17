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
import { API, LoginType } from '../Utils/API'

interface IState {
  register: boolean;
  isLoading: boolean;
  apiResponce: string;
  email: string;
  password: string;
  confirmationPassword: string;
  emailValid: boolean;
  passwordValid: boolean;
  confirmationPasswordValid: boolean;
}


const SWAGG_SENTENCES : string[] = ["Get stung ? It will be fine.", "Stay calm, if you are going to die in the next 10 min it's already too late anyway.", "At least mosquito like you."];

class Login extends Component<null, IState> {
  private emailInput: React.RefObject<Input>;
  private passwordInput: React.RefObject<Input>;
  private confirmationPasswordInput: React.RefObject<Input>;

  state: IState = {
    register: true,
    isLoading: false,
    apiResponce: '',
    email: '',
    password: '',
    confirmationPassword: '',
    emailValid: true,
    passwordValid: true,
    confirmationPasswordValid: true,
  };

  constructor(props: any) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.confirmationPasswordInput = React.createRef();
  }

  register = () => {
    const { email, password } = this.state;
    if (IS_DEBUG || (this.validateEmail()
        && this.validatePassword()
        && this.validateConfirmationPassword())) {
      this.setState({ isLoading: true });
      API.post(`${API.url_register}`, {email, password})
      .then((response:Response) => this._apiResponse(response))
      .catch(err => {
        this.setState({ isLoading: false, apiResponce: "Can't connect to API" });
        return err;
      });
    }
  };

  login = () => {
    const { email, password } = this.state;
    if (IS_DEBUG || (this.validateEmail()
        && this.validatePassword())) {
      this.setState({ isLoading: true });
      API.post(`${API.url_login}`, {email, password})
      .then((response:Response) => this._apiResponse(response))
      .catch(err => {
        this.setState({ isLoading: false, apiResponce: "Can't connect to API"});
        return err;
      });
    }
  };

  _apiResponse = (response: Response) => {
    response.json().then((responseJSON : LoginType) => {
      if (response.status >= 200 && response.status < 300 && responseJSON.token != null) {
        Store.dispatch(userToken({ token: responseJSON.token}));
        this.setState({ isLoading: false});
      } else {
        this.setState({ isLoading: false, apiResponce: responseJSON.message ? responseJSON.message : "" });
      }
    })
  }

  validateEmail = () => {
    const { email } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    this.setState({ emailValid, apiResponce: "" });
    return emailValid;
  };

  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= 1;
    this.setState({ passwordValid, apiResponce: "" });
    return passwordValid;
  };

  validateConfirmationPassword = () => {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    this.setState({ apiResponce: "" });
    return confirmationPasswordValid;
  };

  render() {
    const {
      isLoading,
      register,
      apiResponce,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
    } = this.state;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.formContainer}>
          <Text style={styles.signUpText}>{register ? "Sign up" : "Login"}</Text>
          <Text style={styles.swaggSentence}>{SWAGG_SENTENCES[Math.floor(Math.random() * SWAGG_SENTENCES.length)]}</Text>
          <Text style={styles.apiError}>{apiResponce}</Text>
          <View style={{width: '80%', alignItems: 'center', height: '30%'}}>
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
            { register === true && <FormInput
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
            }
          </View>
          <Button
            loading={isLoading}
            title={ register ? "SIGNUP" : "LOGIN"}
            containerStyle={{flex: -1}}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={register ? this.register : this.login}
            disabled={isLoading}
          />
        </KeyboardAvoidingView>
        <View style={styles.loginHereContainer}>
          <Text style={styles.alreadyAccountText}>
            { register ? "Already have an account." : "Doesn't have an account ?" }
          </Text>
          <Button
            title={ register ? "Login here": "Sing up here" }
            titleStyle={styles.loginHereText}
            containerStyle={{flex: -1}}
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={() => this.setState({register: !register})}
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
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'UbuntuLight',
  },
  swaggSentence: {
    color: '#7384B4',
    fontFamily: 'UbuntuBold',
    fontSize: 14,
    maxWidth: SCREEN_WIDTH * 0.7,
  },
  apiError: {
    color: 'crimson',
    fontFamily: 'UbuntuBold',
    fontSize: 14,
    maxWidth: SCREEN_WIDTH * 0.7,
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
