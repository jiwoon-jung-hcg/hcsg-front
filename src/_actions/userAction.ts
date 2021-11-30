import { loginInfo } from '../types/signInType';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const;
export const LOG_IN_SUCCESS = 'LOG_IN_REQUEST' as const;
export const LOG_IN_FAILURE = 'LOG_IN_REQUEST' as const;
export const LOG_OUT_REQUEST = 'LOG_OUT' as const;

/** Login */
export interface LoginRequestAction {
	type: typeof LOG_IN_REQUEST;
	data: loginInfo;
}

export interface LoginSuccessAction {
	type: typeof LOG_IN_SUCCESS;
	data: loginInfo;
}

export interface LoginFailureAction {
	type: typeof LOG_IN_SUCCESS;
	error: Error;
}

export const logIn = (data: loginInfo) => {
	console.log('aa');
};

/** Logout */
export interface LogOutAction {
	type: typeof LOG_OUT_REQUEST;
}

export const logOut = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};
