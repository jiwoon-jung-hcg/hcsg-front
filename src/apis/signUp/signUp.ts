import axios from 'axios';
import { signupUserInfo } from '../../types/signupType';
import { CookieSingleton } from '../../utils/cookie';
import { logger } from '../../utils/logger';

export const headerConfig = {
	headers: {
		token: CookieSingleton.getCookie().get('refresh_token'),
	},
};

/** 이메일 중복 확인 */
export async function checkUsingEmail(email: string): Promise<boolean> {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/users/email_check`,
			{
				email,
			},
			headerConfig,
		);
		return response.data;
	} catch (error) {
		logger(error);
		throw new Error(typeof error == 'string' ? error : 'Exception error');
	}
}

/** 닉네임 중복 확인 */
export async function checkUsingNickname(nickname: string): Promise<boolean> {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/users/nickname_check`,
			{
				nickname,
			},
			headerConfig,
		);
		return response.data;
	} catch (error) {
		logger(error);
		throw new Error(typeof error == 'string' ? error : 'Exception error');
	}
}

/** 회원가입 요청 */
export async function userSignup({ email, nickname, password, password_check }: signupUserInfo) {
	try {
		const respose = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/users/signup`,
			{
				email,
				nickname,
				password,
				password_check,
			},
			headerConfig,
		);
		return respose.data;
	} catch (error) {
		logger(error);
		throw new Error(typeof error === 'string' ? error : 'Exception new Error..');
	}
}
