import { call, put, takeLatest } from '@redux-saga/core/effects';
import produce from 'immer';
import { isAuthCheck } from '../apis/common/auth';
import { Action } from './user';

export interface AuthResponse {
	is_auth: boolean;
	userId?: number;
	nickname?: string;
}

export const authInitialState = {
	is_auth: false,
	nickname: null,
	userId: null,
};

export const AUTH_REQUEST = 'auth/AUTH_REQUEST';
export const AUTH_SUSCCESS = 'auth/AUTH_SUSCCESS';
export const AUTH_FAILURE = 'auth/AUTH_FAILURE';

export const getAuth = (): Action => {
	return {
		type: AUTH_REQUEST,
		payload: null,
	};
};

export function* authCheckSaga() {
	try {
		const response: AuthResponse = yield call(isAuthCheck);
		yield put({
			type: AUTH_SUSCCESS,
			payload: { is_auth: true, nickname: response.nickname, userId: response.userId },
		});
	} catch (error) {
		yield put({ type: AUTH_FAILURE, payload: { is_auth: false, nickname: null, userId: null } });
	}
}

export function* watchAuth() {
	yield takeLatest(AUTH_REQUEST, authCheckSaga);
}

export default function authReducers(state = authInitialState, action: Action) {
	switch (action.type) {
		case AUTH_SUSCCESS:
			return produce(state, (prevState) => {
				prevState.is_auth = true;
				prevState.nickname = action.payload.nickname;
				prevState.userId = action.payload.userId;
			});
		case AUTH_FAILURE:
			return produce(state, (prevState) => {
				prevState.is_auth = false;
				prevState.nickname = null;
				prevState.userId = null;
			});
		default:
			return state;
	}
}
