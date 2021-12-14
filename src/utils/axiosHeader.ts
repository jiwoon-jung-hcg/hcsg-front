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
		},
	};
	console.log(':::::::::CONFIG::::::::::');
	console.log(config);
	return { ...config };
	// return config 랑 무엇이 다를까요!? 호출할때마다 새로운 객체를 리턴하기 위함인가요~?
};
