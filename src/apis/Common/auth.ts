import axios from 'axios';
import Cookies from 'universal-cookie';
import { logger } from '../../utils/logger';

export async function isAuthCheck() {
	try {
		const cookie = new Cookies();
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth_check`, {
			headers: {
				token: cookie.get('refresh_token'),
			},
		});
		if (!response.data.isAuth) {
			throw { isAuth: response.data.isAuth, nickname: null, userId: null };
		}
		return { isAuth: true, nickname: response.data.nickname, userId: response.data.userId };
	} catch (error) {
		logger(error);
		console.dir(error);
		throw new Error(`doesn't authentication`);
	}
}
