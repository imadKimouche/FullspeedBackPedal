import React from 'react';
import {StyleSheet} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import Colors from '../Utils/Colors';

const FormInput = (props: any) => {
  const {icon, refInput, ...otherProps} = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        <Icon
          name={icon}
          type={'IonIcons'}
          color={Colors.secondaryText}
          size={18}
        />
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

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.secondaryText,
    height: 45,
    marginVertical: 10
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: Colors.black,
    fontSize: 16
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: Colors.danger
  }
});

export default FormInput;
