import { call, put, takeLatest } from '@redux-saga/core/effects';
import { LoginInfo, SignupUserInfo, userLogin, userSignup } from '../apis/user/user';

export interface Action<T = any> {
	type: string;
	payload: T;
}
//============================================================//
/** initial state */
//============================================================//
export const userInitialState = {
	loginSuccess: false,
	signupSuccess: false,
	failure: {
		keyword: null,
		error: null,
	},
};

//============================================================//
/** Action Type */
//============================================================//
export const LOGIN_REQUEST = 'user/USER_LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';
export const LOGOUT = 'user/LOGOUT';
export const DELETE_USER = 'user/DELETE_USER';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const getLogin = (userInfo: LoginInfo) => ({ type: LOGIN_REQUEST, payload: { ...userInfo } });
export const logout = (userId: number) => ({ type: LOGOUT, payload: { userId } });
export const signup = (userSignupInfo: SignupUserInfo) => ({ type: SIGNUP_REQUEST, payload: { ...userSignupInfo } });
export const userDelete = (userId: number) => ({ type: DELETE_USER, payload: { userId } });

//============================================================//
/** 2️⃣ Saga function */
//============================================================//
function* userLoginSaga(action: Action) {
	try {
		yield call(userLogin, action.payload);
		yield put({
			type: LOGIN_SUCCESS,
			payload: {
				loginSuccess: true,
			},
		});
	} catch (error: any) {
		yield put({
			type: LOGIN_FAILURE,
			payload: {
				keyword: error.keyword,
				error: error.error,
			},
		});
	}
}
function* userSignupSaga(action: Action) {
	try {
		yield call(userSignup, action.payload);
		yield put({
			type: SIGNUP_SUCCESS,
			payload: {
				loginSuccess: true,
			},
		});
	} catch (error: any) {
		yield put({
			type: SIGNUP_FAILURE,
			payload: {
				loginSucess: false,
			},
		});
	}
}

//============================================================//
/** 1️⃣ Take */
//============================================================//
export function* watchUser() {
	yield takeLatest(LOGIN_REQUEST, userLoginSaga);
	yield takeLatest(SIGNUP_REQUEST, userSignupSaga);
}

//============================================================//
/** 3️⃣ Reducer */
//============================================================//
export default function userReducers(state = userInitialState, action: Action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				user: {
					userId: action.payload.userId,
					nickname: action.payload.nickname,
				},
				loginSuccess: true,
				failure: { keyword: null, error: null },
			};
		case LOGIN_FAILURE:
			return {
				...state,
				user: { userId: null, nickname: null },
				loginSuccess: false,
				failure: {
					keyword: action.payload.keyword,
					error: action.payload.error,
				},
			};
		default:
			return state;
	}
}
