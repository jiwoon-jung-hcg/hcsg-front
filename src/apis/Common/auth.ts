import axios from 'axios';
import { headerConfig } from '../../utils/axiosHeader';
import { logger } from '../../utils/logger';

export async function isAuthCheck() {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth-check`, headerConfig());
		const data: { is_auth: boolean; nickname: string; id: number; avatar_url: string } = response.data;
		if (data.is_auth) {
			return { is_auth: true, nickname: data.nickname, userId: data.id, avatar: data.avatar_url };
		}
		throw { error: { is_auth: false, nickname: null, userId: null } };
	} catch (error) {
		logger(error);
		throw new Error(`doesn't authentication`);
	}
}
