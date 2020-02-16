import { Alert } from 'react-native';
import { createReducer } from '@reduxjs/toolkit'
import { userToken, UserTokenActionType} from '../actions/userActions'

type SliceState = { token: string }

const userTokenReducer = (state : SliceState, action : UserTokenActionType) => {
  state.token = action.payload.token
  };

const userReducer = createReducer({ token: "" } as SliceState , {
    [userToken.type] : userTokenReducer,
  }
)

export default userReducer;