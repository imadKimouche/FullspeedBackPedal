import {createReducer} from '@reduxjs/toolkit';
import {
  userInfo,
  logout,
  start,
  UserInfoActionType,
  UserInfo
} from '../actions/userActions';
import {setAsyncItem, getAsyncItem} from '../../Utils/Utility';

type SliceState = {userInfo: UserInfo};

const userInfoReducer = (state: SliceState, action: UserInfoActionType) => {
  state.userInfo.token = action.payload.token;
  setAsyncItem('token', action.payload.token);
  state.userInfo.id = action.payload.id;
  state.userInfo.username = action.payload.username;
  state.userInfo.email = action.payload.email;
  state.userInfo.creation_date = action.payload.creation_date;
};

const startReducer = (state: SliceState) => {
  let userToken = getAsyncItem('token');
  if (userToken !== null) {
    userToken
      .then(token => {
        return (state.userInfo.token = token);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const logoutReducer = (state: SliceState) => {
  state.userInfo.token = '';
};

const userReducer = createReducer(
  {
    userInfo: {id: '', username: '', email: '', creation_date: '', token: ''}
  } as SliceState,
  {
    [userInfo.type]: userInfoReducer,
    [logout.type]: logoutReducer,
    [start.type]: startReducer
  }
);

export default userReducer;
