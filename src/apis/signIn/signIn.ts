import axios from 'axios';

/** 로그인 요청 */
export async function userLogin(email: string, password: string) {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/users/signin`);
		if (response.data.token) {
			console.log(email, password);
			console.log(response.data.token);
		} else {
			throw new Error('not exist token ...');
		}
	} catch (error) {
		console.log(error);
	}
}
