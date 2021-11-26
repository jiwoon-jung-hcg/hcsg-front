import axios from 'axios';
import { CookieSingleton } from '../../utils/cookie';

//type
import { loginInfo, logInResponse } from '../../types/signInType';
const cookie = CookieSingleton.getCookie();

/** 로그인 요청 */
export async function userLogin({ email, password }: loginInfo): Promise<logInResponse> {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/signin`, {
			email,
			password,
		});
		if (response.data.token) {
			// 토큰값 쿠키에 저장
			cookie.set('refresh_token', response.data.token);
			return {
				success: true,
				keyword: '',
				message: '로그인 완료',
			};
		} else {
			throw new Error('not exist token...');
		}
	} catch (err: any) {
		const { error, keyword } = err.response.data;
		return {
			success: false,
			keyword,
			error,
		};
	}
}
