import { NavigateFunction, useNavigate } from 'react-router';
import { isCheckAfterValid, feedbackAfterValid, logInResponse } from '../types/signInType';

// COMMON
/** 빈값 체크 */
export function isNullCheck(email: string): boolean {
	return email.length === 0;
}
/** email validate */
export function checkEmail(email: string): boolean {
	const emailCheck = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	return emailCheck.test(email);
}
/** password validate */
export function checkPassword(password: string): { success: boolean; message?: string } {
	const isLength = password.length > 5;
	const findNum = password.search(/[0-9]/g);
	const findStr = password.search(/[a-z]/gi);
	const findSpecial = password.search(/[`~!@@#$%^&*|'"/?]/gi);

	if (!isLength) {
		return { success: false, message: '6자리 이상 입력해주세요' };
	} else if (findNum < 0 || findStr < 0 || findSpecial < 0) {
		return { success: false, message: '숫자, 영문, 특수문자를 1자이상 포함해주세요' };
	} else {
		return { success: true, message: '완료' };
	}
}

// Login
/** 이메일 & 패스워드 체크 결과 변경 */
export function checkLoginInfo(
	email: string,
	password: string,
	setEmailCheck: isCheckAfterValid,
	setPasswordCheck: isCheckAfterValid,
	setEmailCheckFeedBack: feedbackAfterValid,
	setPasswordCheckFeedBack: feedbackAfterValid,
): boolean {
	if (isNullCheck(email) || !checkEmail(email)) {
		setEmailCheckFeedBack('유효한 이메일을 입력해주세요');
		setEmailCheck(false);
		return false;
	}
	if (isNullCheck(password)) {
		setEmailCheck(true);
		setEmailCheckFeedBack('');
		setPasswordCheckFeedBack('비밀번호를 입력해주세요');
		setPasswordCheck(false);
		return false;
	}
	setEmailCheckFeedBack('');
	setPasswordCheckFeedBack('');
	setPasswordCheck(true);
	setEmailCheck(true);
	return true;
}
/** 로그인 요청 응답 체크 */
export function checkLoginResponse(
	res: logInResponse,
	setEmailCheck: isCheckAfterValid,
	setPasswordCheck: isCheckAfterValid,
	setEmailCheckFeedBack: feedbackAfterValid,
	setPasswordCheckFeedBack: feedbackAfterValid,
): boolean {
	if (res.keyword === 'email') {
		setEmailCheck(false);
		setPasswordCheck(true);
		setEmailCheckFeedBack('존재하지 않는 이메일 입니다');
	} else if (res.keyword === 'password') {
		setEmailCheck(true);
		setPasswordCheck(false);
		setPasswordCheckFeedBack('비밀번호가 틀렸습니다');
	}
	return res.success;
}

// SignUp
/** 이메일 체크 */
export function checkSignupEmail(email: string): boolean {
	if (!isNullCheck(email) && checkEmail(email)) {
		return true;
	}
	return false;
}

/** 패스워드 체크 */
// export function checkSignupPassword(password: string): boolean {
// 	if (!isNullCheck(password) && checkPassword(password).success) {
// 	}
// }
