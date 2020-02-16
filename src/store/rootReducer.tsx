import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'

export const rootReducer = combineReducers({
    userReducer,
})

export type RootState = ReturnType<typeof rootReducer>