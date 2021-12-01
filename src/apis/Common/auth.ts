import axios from 'axios';
import { logger } from '../../utils/logger';

export async function isAuthCheck() {
	try {
		// axios.get();
	} catch (error) {
		logger(error);
		throw new Error(`doesn't authentication`);
	}
}
