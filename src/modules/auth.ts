import { call, put, takeLatest } from '@redux-saga/core/effects';
import produce from 'immer';
import { isAuthCheck } from '../apis/Common/auth';
import { Action } from './user';

export interface AuthResponse {
	is_auth: boolean;
	userId?: number;
	nickname?: string;
}

export const authInitialState = {
	is_auth: false, // 프론트에서는 camel case를 사용하는 것이 좋을 것 같습니다!
	nickname: null,
	userId: null,
};

export const AUTH_REQUEST = 'auth/AUTH_REQUEST';
export const AUTH_SUSCCESS = 'auth/AUTH_SUSCCESS';
export const AUTH_FAILURE = 'auth/AUTH_FAILURE';

export const getAuth = (): Action => {
	// Action 타입은 인자를 받게 되어 있는데 지금과 같이 받지 않는 경우 any가 기본값이네요 그래서 이렇게 되면 Action 값의 payload는 타입을 any로 인식 할 것 같습니다!
	return {
		type: AUTH_REQUEST,
		payload: null,
		// Action 타입에서 payload 자체를 옵셔널로 받으면 null 값으로 안주고 제거 할 수 있을 것 같아요!
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
