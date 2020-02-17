
import React from 'react';
import { Store, RootState } from '../store/configureStore';
import Login from '../Views/Login';
import HomeNavigator from './HomeNavigator';
import { connect } from 'react-redux';
import { userToken } from '../store/actions/userActions';

const LoginNavigator = (props : {isLogged?: boolean}) => {
  console.log(props.isLogged)
  //Store.dispatch(userToken({ token: ""}));
  return (!props.isLogged) ?  <Login/> : <HomeNavigator/>
}

const mapStateToProps = function(state : RootState) {
  return {
    isLogged: (state.userReducer.token == "") ? false : true,
  }
}

const LoginNavigatorConnected = connect(mapStateToProps, null)(LoginNavigator)

export default LoginNavigatorConnected;