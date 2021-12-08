import axios from 'axios';
import { headerConfig } from '../../utils/axiosHeader';
import { logger } from '../../utils/logger';

export async function isAuthCheck() {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth_check`, headerConfig());
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
