import {createAction} from '@reduxjs/toolkit';

type UserToken = {token: string};
export type UserInfo = {
  id: string;
  username: string;
  email: string;
  creation_date: string;
  token: string;
};
export const userInfo = createAction<UserInfo>('register');
export const logout = createAction<number>('logout');
export const start = createAction<number>('start');
export type UserInfoActionType = {payload: UserInfo; type: 'register'};
