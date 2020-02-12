import React, {Component} from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {withNavigationFocus, NavigationScreenProp} from 'react-navigation';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface IProps {
  isFocused: boolean;
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  isLoading: boolean;
  selectedType: null;
  username: string;
  email: string;
  password: string;
  confirmationPassword: string;
  emailValid: boolean;
  passwordValid: boolean;
  usernameValid: boolean;
  confirmationPasswordValid: boolean;
}

class Login extends Component<IProps, IState> {
  private usernameInput: React.RefObject<Input>;
  private emailInput: React.RefObject<Input>;
  private passwordInput: React.RefObject<Input>;
  private confirmationPasswordInput: React.RefObject<Input>;

  state: IState = {
    isLoading: false,
    selectedType: null,
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

  signup = () => {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    if (true) {
      // emailValid &&
      // passwordValid &&
      // confirmationPasswordValid &&
      // usernameValid
      this.setState({isLoading: true});
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({isLoading: false});
        this.props.navigation.navigate('Glossary');
      }, 1500);
    }
  };

  validateUsername = () => {
    const {username} = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({usernameValid});
    if (usernameValid && this.usernameInput.current != null)
      this.usernameInput.current.shake();
    return usernameValid;
  };

  validateEmail = () => {
    const {email} = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({emailValid});
    if (emailValid && this.emailInput.current != null)
      this.emailInput.current.shake();
    return emailValid;
  };

  validatePassword = () => {
    const {password} = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({passwordValid});
    if (passwordValid && this.passwordInput.current != null)
      this.passwordInput.current.shake();
    return passwordValid;
  };

  validateConfirmationPassword = () => {
    const {password, confirmationPassword} = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({confirmationPasswordValid});
    if (
      confirmationPasswordValid &&
      this.confirmationPasswordInput.current != null
    )
      this.confirmationPasswordInput.current.shake();
    return confirmationPasswordValid;
  };

  setSelectedType = (selectedType: any) => {
    LayoutAnimation.easeInEaseOut();
    this.setState({selectedType});
  };

  render() {
    const {
      isLoading,
      selectedType,
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
                this.signup();
              }}
            />
          </View>
          <Button
            loading={isLoading}
            title="SIGNUP"
            containerStyle={{flex: -1}}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={this.signup}
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

export const UserTypeItem = (props: any) => {
  const {image, label, labelColor, selected, ...attributes} = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}>
        <Text style={[styles.userTypeLabel, {color: labelColor}]}>{label}</Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = (props: any) => {
  const {icon, refInput, ...otherProps} = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        <Icon name={icon} type={'simple-line-icon'} color="#7384B4" size={18} />
      }
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  );
};

export default withNavigationFocus(Login);

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
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    fontFamily: 'UbuntuBold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'UbuntuLight',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
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
