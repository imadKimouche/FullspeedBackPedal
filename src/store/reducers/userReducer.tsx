import {createReducer} from '@reduxjs/toolkit';
import {
  userInfo,
  logout,
  start,
  UserInfoActionType,
  UserInfo,
} from '../actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';

type SliceState = {userInfo: UserInfo};

const getAsyncToken = async (): Promise<string | null> => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    //decrypt [TODO]
    return userToken;
  } catch (error) {
    console.log('Login reducer error: ' + error);
  }
  return null;
};

const userInfoReducer = (state: SliceState, action: UserInfoActionType) => {
  console.log('user information: ', state.userInfo);
  state.userInfo.token = action.payload.token;
  state.userInfo.id = action.payload.id;
  state.userInfo.username = action.payload.username;
  state.userInfo.email = action.payload.email;
  state.userInfo.creation_date = action.payload.creation_date;
};

const startReducer = (state: SliceState) => {
  let userToken = getAsyncToken();
  if (userToken !== null) {
    userToken.then(token => (state.userInfo.token = token as string));
  }
};

const logoutReducer = (state: SliceState) => {
  state.userInfo.token = '';
};

//login {
// asyncstorage.setitem(usertoken: token) [TODO]
// }

const userReducer = createReducer(
  {
    userInfo: {id: '', username: '', email: '', creation_date: '', token: ''},
  } as SliceState,
  {
    [userInfo.type]: userInfoReducer,
    [logout.type]: logoutReducer,
    [start.type]: startReducer,
  },
);

export default userReducer;
