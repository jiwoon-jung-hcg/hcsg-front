import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import { watchUser } from './user';
import userReducers from './user';
import authReducers, { watchAuth } from './auth';
import postReducers, { watchPost } from './post';

export const RootReducer = combineReducers({ user: userReducers, auth: authReducers, post: postReducers });

export type RootState = ReturnType<typeof RootReducer>;

export default function* rootSaga() {
	yield fork(watchUser);
	yield fork(watchAuth);
	yield fork(watchPost);
}
