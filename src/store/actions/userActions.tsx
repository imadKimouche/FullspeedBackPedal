import { createAction } from '@reduxjs/toolkit'

type UserToken = {token: string};
export const userToken = createAction<UserToken>('register')
export type UserTokenActionType = {payload: UserToken, type:'register'};