import axios from 'axios';

/** 이메일 중복 확인 */
export async function checkUsingEmail(email: string) {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/`);
	} catch (error) {
		console.log(error);
	}
}

/** 닉네임 중복 확인 */

/** 회원가입 요청 */
