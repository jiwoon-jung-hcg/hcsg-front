import Cookies from 'universal-cookie';
const cookie = new Cookies();

export interface HeaderConfig {
	headers: {
		token: string;
	};
}

export const headerConfig = (): HeaderConfig => {
	const token = cookie.get('refresh_token');
	const config = token && {
		headers: {
			token: token,
			// 이름이 같은 경우는 token 하나만 써주셔도 될 것 같습니다!
		},
	};
	return { ...config };
};
