
import React from 'react';
import { RootState } from '../store/configureStore';
import Login from '../Views/Login';
import HomeNavigator from './HomeNavigator';
import { connect } from 'react-redux';

const LoginNavigator = (props : {isLogged?: boolean}) => {
  console.log(props.isLogged)
  return (!props.isLogged) ?  <Login/> : <HomeNavigator/>
}

const mapStateToProps = function(state : RootState) {
  return {
    isLogged: (state.userReducer.token == "") ? false : true,
  }
}

const LoginNavigatorConnected = connect(mapStateToProps, null)(LoginNavigator)

export default LoginNavigatorConnected;