import { call, put, takeLatest } from '@redux-saga/core/effects';
import produce from 'immer';
import Cookies from 'universal-cookie';
import {
	LoginInfo,
	SignInFailResponse,
	SignupUserInfo,
	updatePictureRequest,
	userLogin,
	userSignup,
} from '../apis/user/user';
import ErrorResponse from '../types/Error';

export interface Action<T = any> {
	type: string;
	payload: T;
}
export interface UpdatePictureResponse {
	avatar: string;
	updateImageSuccess: boolean;
}
//============================================================//
/** initial state */
//============================================================//
export const userInitialState = {
	user: { avatar: '', postsCount: 0, likesCount: 0 },
	loginSuccess: false,
	signupSuccess: false,
	logoutSuccess: false,
	updateImageSuccess: false,
	failure: {
		keyword: null,
		error: null,
	},
	loading: true,
};

//============================================================//
/** Action Type */
//============================================================//
export const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';
export const DELETE_USER = 'user/DELETE_USER';
export const LOGIN_REQUEST = 'user/USER_LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

export const UPDATE_PICTURE_REQUEST = 'user/UPDATE_PICTURE_REQUEST';
export const UPDATE_PICTURE_SUCCESS = 'user/UPDATE_PICTURE_SUCCESS';
export const UPDATE_PICTURE_FAILURE = 'user/UPDATE_PICTURE_FAILURE';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const getLogin = (userInfo: LoginInfo) => ({ type: LOGIN_REQUEST, payload: { ...userInfo } });
export const logout = () => ({ type: LOGOUT_REQUEST, payload: null });
export const signup = (userSignupInfo: SignupUserInfo) => ({ type: SIGNUP_REQUEST, payload: { ...userSignupInfo } });
export const userDelete = (userId: number) => ({ type: DELETE_USER, payload: { userId } });
export const updatePictureAction = (file: File) => ({ type: UPDATE_PICTURE_REQUEST, payload: { file } });

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
function* updatePictureSaga(action: Action) {
	try {
		const response: UpdatePictureResponse = yield call(updatePictureRequest, action.payload);
		yield put({ type: UPDATE_PICTURE_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: UPDATE_PICTURE_FAILURE, payload: { ...(error as ErrorResponse<UpdatePictureResponse>).error } });
	}
}

function* logoutUser(action: Action) {
	const cookie = new Cookies();
	yield cookie.remove('refresh_token');
	yield put({ type: LOGOUT_SUCCESS, payload: { logoutSuccess: true } });
}

//============================================================//
/** 1️⃣ Take */
//============================================================//
export function* watchUser() {
	yield takeLatest(LOGIN_REQUEST, userLoginSaga);
	yield takeLatest(SIGNUP_REQUEST, userSignupSaga);
	yield takeLatest(UPDATE_PICTURE_REQUEST, updatePictureSaga);
	yield takeLatest(LOGOUT_REQUEST, logoutUser);
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
		case LOGOUT_SUCCESS:
			return produce(state, (draftState) => {
				draftState.logoutSuccess = true;
			});
		case UPDATE_PICTURE_SUCCESS:
			return produce(state, (draftState) => {
				draftState.updateImageSuccess = action.payload.updateImageSuccess;
				draftState.user.avatar = action.payload.avatar;
			});
		default:
			return state;
	}
}
