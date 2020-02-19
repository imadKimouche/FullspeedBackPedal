import {configureStore} from '@reduxjs/toolkit';
import {StateType} from 'typesafe-actions';

import {rootReducer} from './rootReducer';

export const Store = configureStore({
  reducer: rootReducer,
});
export type RootState = StateType<{
  userReducer: ReturnType<typeof import('./reducers/userReducer').default>;
}>;
export type AppDispatch = typeof Store.dispatch;
