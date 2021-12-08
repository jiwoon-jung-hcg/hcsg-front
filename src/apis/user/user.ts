import axios from 'axios';
import Cookies from 'universal-cookie';
import { headerConfig } from '../../utils/axiosHeader';

//type
import { logger } from '../../utils/logger';
const cookie = new Cookies();

export interface LoginInfo {
	email: string;
	password: string;
}

export interface SignupUserInfo extends LoginInfo {
	nickname: string;
	passwordCheck: string;
}

/** 로그인 요청 */
export async function userLogin({ email, password }: LoginInfo) {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/users/signin`,
			{
				email,
				password,
			},
			headerConfig(),
		);
		response.data.token && cookie.set('refresh_token', response.data.token);
		return { userId: response.data.userId, nickname: response.data.nickname };
	} catch (error: any) {
		logger(error);
		throw { keyword: error.response.data?.keyword, error: error.response.data?.error };
	}
}

/** 이메일 중복 확인 */
export async function checkUsingEmail(email: string): Promise<boolean> {
	const response = await axios.post(
		`${process.env.REACT_APP_SERVER_URL}/api/v1/users/check`,
		{
			email,
		},
		headerConfig(),
	);
	return response.data;
}

/** 닉네임 중복 확인 */
export async function checkUsingNickname(nickname: string): Promise<boolean> {
	const response = await axios.post(
		`${process.env.REACT_APP_SERVER_URL}/api/v1/users/check`,
		{
			nickname,
		},
		headerConfig(),
	);
	return response.data;
}

/** 회원가입 요청 */
export async function userSignup({ email, nickname, password, passwordCheck }: SignupUserInfo) {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/users/signup`,
			{
				email,
				password,
				nickname,
				password_check: passwordCheck,
			},
			headerConfig(),
		);
		response.data.token && cookie.set('refresh_token', response.data.token);
		return {
			success: true,
		};
	} catch (error: any) {
		logger(error);
		throw { success: false };
	}
}
