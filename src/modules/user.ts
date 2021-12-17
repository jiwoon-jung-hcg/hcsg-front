import { call, put, takeLatest } from '@redux-saga/core/effects';
import produce from 'immer';
import Cookies from 'universal-cookie';
import {
	LoginInfo,
	SignInFailResponse,
	SignupUserInfo,
	updateNicknameRequest,
	updatePasswordRequest,
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
export interface UpdateNicknameResponse {
	updateNicknameSuccess: boolean;
	nickname: string;
}
export interface UpdatePasswordResponse {
	updatePasswordSuccess: boolean;
	nickname: string;
}
//============================================================//
/** initial state */
//============================================================//
export const userInitialState = {
	user: { avatar: '', postsCount: 0, likesCount: 0, nickname: '' },
	loginSuccess: false,
	signupSuccess: false,
	logoutSuccess: false,
	updateImageSuccess: false,
	updateNicknameSuccess: false,
	updatePasswordSuccess: false,
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
export const UPDATE_NICKNAME_REQUEST = 'user/UPDATE_NICKNAME_REQUEST';
export const UPDATE_NICKNAME_SUCCESS = 'user/UPDATE_NICKNAME_SUCCESS';
export const UPDATE_NICKNAME_FAILURE = 'user/UPDATE_NICKNAME_FAILURE';
export const UPDATE_PASSWORD_REQUEST = 'user/UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'user/UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'user/UPDATE_PASSWORD_FAILURE';

export const REFRESH_NICKNAME_CHECK = 'user/REFRESH_NICKNAME_CHECK';
export const REFRESH_PASSWORD_CHECK = 'user/REFRESH_PASSWORD_CHECK';
export const REFRESH_PICTURE_CHECK = 'user/REFRESH_PICTURE_CHECK';
export const REFRESH_LOGIN_SUCCESS = 'user/REFRESH_LOGIN_SUCCESS';
export const REFRESH_SIGNUP_SUCCESS = 'user/REFRESH_SIGNUP_SUCCESS';
export const REFRESH_ALL_CHECK = 'user/REFRESH_ALL_CHECK';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const getLogin = (userInfo: LoginInfo) => ({ type: LOGIN_REQUEST, payload: { ...userInfo } });
export const logout = () => ({ type: LOGOUT_REQUEST, payload: null });
export const signup = (userSignupInfo: SignupUserInfo) => ({ type: SIGNUP_REQUEST, payload: { ...userSignupInfo } });
export const userDelete = (userId: number) => ({ type: DELETE_USER, payload: { userId } });
export const updatePictureAction = (file: File) => ({ type: UPDATE_PICTURE_REQUEST, payload: { file } });
export const updateNicknameAction = (nickname: string) => ({ type: UPDATE_NICKNAME_REQUEST, payload: { nickname } });
export const updatePasswordAction = (password: string) => ({ type: UPDATE_PASSWORD_REQUEST, payload: { password } });

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
	yield put({ type: LOGOUT_SUCCESS, payload: { logoutSuccess: true } });
}

function* updateNicknameSaga(action: Action<{ nickname: string }>) {
	try {
		const response: UpdateNicknameResponse = yield call(updateNicknameRequest, action.payload.nickname);
		yield put({ type: UPDATE_NICKNAME_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({
			type: UPDATE_NICKNAME_FAILURE,
			payload: { ...(error as ErrorResponse<UpdateNicknameResponse>).error },
		});
	}
}

function* updatePasswordSaga(action: Action<{ password: string }>) {
	try {
		const response: UpdatePasswordResponse = yield call(updatePasswordRequest, action.payload.password);
		yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({
			type: UPDATE_PASSWORD_FAILURE,
			payload: { ...(error as ErrorResponse<UpdatePasswordResponse>).error },
		});
	}
}

//============================================================//
/** 1️⃣ Take */
//============================================================//
export function* watchUser() {
	yield takeLatest(LOGIN_REQUEST, userLoginSaga);
	yield takeLatest(SIGNUP_REQUEST, userSignupSaga);
	yield takeLatest(UPDATE_PICTURE_REQUEST, updatePictureSaga);
	yield takeLatest(LOGOUT_REQUEST, logoutUser);
	yield takeLatest(UPDATE_NICKNAME_REQUEST, updateNicknameSaga);
	yield takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordSaga);
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
		case SIGNUP_SUCCESS:
			return produce(state, (draftState) => {
				draftState.signupSuccess = true;
			});
		case SIGNUP_FAILURE:
			return produce(state, (draftState) => {
				draftState.signupSuccess = false;
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
		case UPDATE_NICKNAME_SUCCESS:
			return produce(state, (draftState) => {
				draftState.updateNicknameSuccess = action.payload.updateNicknameSuccess;
				draftState.user.nickname = action.payload.nickname;
			});
		case UPDATE_NICKNAME_FAILURE:
			return produce(state, (draftState) => {
				draftState.updateNicknameSuccess = action.payload.updateNicknameSuccess;
				draftState.user.nickname = action.payload.nickname;
			});
		case UPDATE_PASSWORD_SUCCESS:
			return produce(state, (draftState) => {
				draftState.updatePasswordSuccess = action.payload.updatePasswordSuccess;
			});
		case UPDATE_PASSWORD_FAILURE:
			return produce(state, (draftState) => {
				draftState.updatePasswordSuccess = action.payload.updatePasswordSuccess;
			});
		case REFRESH_NICKNAME_CHECK:
			return produce(state, (draftState) => {
				draftState.updateNicknameSuccess = false;
			});
		case REFRESH_PICTURE_CHECK:
			return produce(state, (draftState) => {
				draftState.updateImageSuccess = false;
			});
		case REFRESH_PASSWORD_CHECK:
			return produce(state, (draftState) => {
				draftState.updatePasswordSuccess = false;
			});
		case REFRESH_SIGNUP_SUCCESS:
			return produce(state, (draftState) => {
				draftState.signupSuccess = false;
			});
		case REFRESH_LOGIN_SUCCESS:
			return produce(state, (draftState) => {
				draftState.loginSuccess = false;
			});
		case REFRESH_ALL_CHECK:
			return produce(state, (draftState) => {
				draftState.logoutSuccess = false;
				draftState.user.avatar = '';
				draftState.user.nickname = '';
				draftState.user.likesCount = 0;
				draftState.user.postsCount = 0;
			});
		default:
			return state;
	}
}
