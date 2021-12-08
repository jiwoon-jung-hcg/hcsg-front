import Cookies from 'universal-cookie';
const cookie = new Cookies();

export interface HeaderConfig {
	headers: {
		token: string;
	};
}

export const headerConfig = (): HeaderConfig => {
	const token = cookie.get('refresh_token');
	const config = {
		headers: {
			token: token ? token : '',
		},
	};

	return { ...config };
};