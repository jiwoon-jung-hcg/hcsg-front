import axios from 'axios';
import Cookies from 'universal-cookie';
import ErrorResponse from '../../types/Error';
import { headerConfig } from '../../utils/axiosHeader';
import getFormData from '../../utils/getFormData';
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
export interface SignInFailResponse {
	keyword: string;
	errorMessage: string;
}
export interface PictureInfo {
	file: File;
}
export interface UpdateNicknameResponse {
	nickname: string;
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
	} catch (error) {
		logger(error);
		const { keyword, errorMessage } = (error as ErrorResponse<SignInFailResponse>).error;
		throw { error: { keyword: keyword, errorMessage: errorMessage } };
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
	} catch (error) {
		logger(error);
		throw { error: { success: false } };
	}
}

/** 이미지 변경 요청 */
export async function updatePictureRequest({ file }: PictureInfo) {
	try {
		const formData = getFormData([['avatar', file]]);
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/mypages/avatar`,
			formData,
			headerConfig('multipart/form-data'),
		);
		return { avatar: response.data.avatar_url, updateImageSuccess: true };
	} catch (error) {
		logger(error);
		throw { error: { avatar: null, updateImageSuccess: false } };
	}
}

export async function updateNicknameRequest(nickname: string) {
	try {
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/mypages/nickname`,
			{ new_nickname: nickname },
			headerConfig(),
		);
		return { updateNicknameSuccess: true, nickname: response.data.nickname };
	} catch (error) {
		logger(error);
		throw { error: { updateNicknameSuccess: false, nickname: '' } };
	}
}

export async function updatePasswordRequest(password: string) {
	try {
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/mypages/password`,
			{ new_password: password, new_password_check: password },
			headerConfig(),
		);
		return { updatePasswordSuccess: true };
	} catch (error) {
		throw { error: { updatePasswordSuccess: false } };
	}
}

export async function getWritePostCountAndLikePostCountRequest() {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/mypages`, headerConfig());
		return response.data;
	} catch (error) {
		throw new Error('not exist user or not exist token');
	}
}
