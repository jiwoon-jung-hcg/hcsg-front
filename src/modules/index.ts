import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import { watchUser } from './user';
import userReducers from './user';
import authReducers, { watchAuth } from './auth';
import postReducers, { watchPost } from './post';
import commentReducers, { watchComment } from './comment';

export const RootReducer = combineReducers({
	user: userReducers,
	auth: authReducers,
	post: postReducers,
	comment: commentReducers,
});

export type RootState = ReturnType<typeof RootReducer>;

export default function* rootSaga() {
	yield fork(watchUser);
	yield fork(watchAuth);
	yield fork(watchPost);
	yield fork(watchComment);
}
