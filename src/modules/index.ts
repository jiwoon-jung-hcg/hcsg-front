import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { userInitialState, watchUser } from './user';
import userReducers from './user';
import authReducers, { watchAuth } from './auth';
import postReducers, { watchPost } from './post';

export const RootReducer = combineReducers({ user: userReducers, auth: authReducers, post: postReducers });

export type RootState = ReturnType<typeof RootReducer>;

export default function* rootSaga() {
	// yield all([fork(watchUser), fork(watchAuth)]);
	yield fork(watchUser);
	yield fork(watchAuth);
	yield fork(watchPost);
}
