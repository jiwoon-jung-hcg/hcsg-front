import React from 'react';

/** 빈값 체크 */
export function emailNullCheck(email: string): boolean {
	return email.length === 0;
}
export function passwordNullCheck(password: string): boolean {
	return password.length === 0;
}
/** 이메일 체크 */
export function checkEmail(email: string): boolean {
	console.log(email);
	const emailCheck = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	console.log(emailCheck.test(email));
	return emailCheck.test(email);
}

export function checkInfo(
	email: string,
	password: string,
	setEmailCheck: (email: boolean) => void,
	setPasswordCheck: (email: boolean) => void,
	setEmailCheckFeedBack: (email: string) => void,
	setPasswordCheckFeedBack: (email: string) => void,
): boolean {
	if (emailNullCheck(email) || !checkEmail(email)) {
		setEmailCheckFeedBack('유효한 이메일을 입력해주세요');
		setEmailCheck(false);
		return false;
	}
	if (passwordNullCheck(password)) {
		setEmailCheck(true);
		setEmailCheckFeedBack('');
		setPasswordCheckFeedBack('비밀번호를 입력해주세요');
		setPasswordCheck(false);
		return false;
	}
	setPasswordCheckFeedBack('');
	setPasswordCheck(true);
	return true;
}
