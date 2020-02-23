import React from 'react';
import {Store, RootState} from '../store/configureStore';
import {useSelector} from 'react-redux';
import {start} from '../store/actions/userActions';
import {CreateRootNavigator} from './CreateRootNavigator';

const RootNavigator = () => {
  Store.dispatch(start(0));
  const isLogged = useSelector(
    (state: RootState) => state.userReducer.userInfo.token !== '',
  );
  console.log(isLogged);
  let Layout = CreateRootNavigator(isLogged);

  return <Layout />;
};

export default RootNavigator;
