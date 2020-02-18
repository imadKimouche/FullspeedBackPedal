import {createAction} from '@reduxjs/toolkit';

type UserToken = {token: string};
export const userToken = createAction<UserToken>('register');
export const logout = createAction<number>('logout');
export const start = createAction<number>('start');
export type UserTokenActionType = {payload: UserToken; type: 'register'};
