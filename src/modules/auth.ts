import { call, put, takeLatest } from '@redux-saga/core/effects';
import { isAuthCheck } from '../apis/Common/auth';
import { Action } from './user';

export interface AuthResponse {
	isAuth: boolean;
	userId?: number;
	nickname?: string;
}

export const authInitialState = {
	isAuth: false,
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
		yield put({ type: AUTH_SUSCCESS, payload: { isAuth: true, nickname: response.nickname, userId: response.userId } });
	} catch (error: any) {
		yield put({ type: AUTH_FAILURE, payload: { isAuth: false, nickname: null, userId: null } });
	}
}

export function* watchAuth() {
	yield takeLatest(AUTH_REQUEST, authCheckSaga);
}

export default function authReducers(state = authInitialState, action: Action) {
	switch (action.type) {
		case AUTH_SUSCCESS:
			return {
				...state,
				isAuth: true,
				nickname: action.payload.nickname,
			};
		case AUTH_FAILURE:
			return {
				...state,
				isAuth: false,
				nickname: null,
			};
		default:
			return state;
	}
}
