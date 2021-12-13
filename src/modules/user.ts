import { call, put, takeLatest } from '@redux-saga/core/effects';
import produce from 'immer';
import Cookies from 'universal-cookie';
import { LoginInfo, SignInFailResponse, SignupUserInfo, userLogin, userSignup } from '../apis/user/user';
import ErrorResponse from '../types/Error';

export interface Action<T = any> {
	type: string;
	payload: T;
}
//============================================================//
/** initial state */
//============================================================//
export const userInitialState = {
	user: null,
	loginSuccess: false,
	signupSuccess: false,
	logoutSuccess: false,
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
export const logout = () => {
	const cookie = new Cookies();
	cookie.remove('refresh_token');
	return { type: LOGOUT, payload: null };
};
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
	} catch (error) {
		yield put({
			type: LOGIN_FAILURE,
			payload: {
				keyword: (error as SignInFailResponse).keyword,
				error: (error as SignInFailResponse).errorMessage,
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
	} catch (error) {
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
			return produce(state, (draftState) => {
				draftState.loginSuccess = true;
				draftState.logoutSuccess = false;
				draftState.failure = { keyword: null, error: null };
			});
		case LOGIN_FAILURE:
			return produce(state, (draftState) => {
				draftState.loginSuccess = false;
				draftState.failure = { keyword: action.payload.keyword, error: action.payload.error };
			});
		case LOGOUT:
			return produce(state, (draftState) => {
				draftState.logoutSuccess = true;
			});
		default:
			return state;
	}
}
