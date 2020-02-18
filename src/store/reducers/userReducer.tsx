import {createReducer} from '@reduxjs/toolkit';
import {
  userToken,
  logout,
  start,
  UserTokenActionType,
} from '../actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';

type SliceState = {token: string};

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

const userTokenReducer = (state: SliceState, action: UserTokenActionType) => {
  state.token = action.payload.token;
};

const startReducer = (state: SliceState) => {
  let userToken = getAsyncToken();
  if (userToken !== null) {
    userToken.then(token => (state.token = token as string));
  }
};

const logoutReducer = (state: SliceState) => {
  state.token = '';
};

//login {
// asyncstorage.setitem(usertoken: token) [TODO]
// }

const userReducer = createReducer({token: ''} as SliceState, {
  [userToken.type]: userTokenReducer,
  [logout.type]: logoutReducer,
  [start.type]: startReducer,
});

export default userReducer;
