import * as React from 'react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// css
import '../../styles/scss/signup.scss';

// MUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { Router, Link } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading';

import coverImage from '../../images/signup.jpg';

import { checkUsingEmail, checkUsingNickname, userSignup } from '../../apis/user/user';
import { checkPassword, checkSignupEmail, isNullCheck } from '../../utils/validation';
import { CookieSingleton } from '../../utils/cookie';
import { logger } from '../../utils/logger';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../modules/user';
import { RootState } from '../../modules';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '5vw',
		backgroundColor: '#fff',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	textRight: {
		textAlign: 'right',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#5ea0a2',
		color: 'white',
	},
	mainImage: {
		width: '100%',
	},
	title: {
		fontSize: '3.5em',
		fontWeight: 'bold',
		color: '#5ea0a2',
	},
	link: {
		textDecoration: 'none',
		fontSize: '.8em',
		textAlign: 'right',
		color: '#b2b2b2',
	},
}));

export default function SignUpPage() {
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth);
	const [isError, setIsError] = useState(true);
	const [email, setEmail] = useState<string>('');
	const [emailCheck, setEmailCheck] = useState(true);
	const [emailCheckFeedback, setEmailCheckFeedback] = useState('');
	const [nickname, setNickname] = useState<string>('');
	const [nicknameCheck, setNicknameCheck] = useState(true);
	const [nicknameCheckFeedback, setNicknameCheckFeedback] = useState('');
	const [password, setPassword] = useState<string>('');
	const [passwordCheck, setPasswordCheck] = useState(true);
	const [passwordCheckFeedback, setpasswordCheckFeedback] = useState('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(true);
	const [confirmPasswordCheckFeedback, setConfirmPasswordCheckFeedback] = useState('');

	React.useEffect(() => {
		auth.isAuth && navigate('/');
	}, [auth]);

	const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	}, []);

	const handleChangeNickname = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.currentTarget.value);
	}, []);

	const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	}, []);

	const handleChangeConfirmPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.currentTarget.value);
	}, []);

	const handleEmailBlur = useCallback(async () => {
		if (checkSignupEmail(email)) {
			const isEmailResult = await checkUsingEmail(email);
			if (isEmailResult) {
				setEmailCheck(true);
				setEmailCheckFeedback('');
			} else {
				setEmailCheck(false);
				setEmailCheckFeedback('이미 존재하는 이메일 입니다');
			}
		} else {
			setEmailCheck(false);
			setEmailCheckFeedback('유효한 이메일을 입력해 주세요');
		}
	}, [email]);

	const handleNicknameBlur = useCallback(async () => {
		if (!isNullCheck(nickname)) {
			const isNicknameRsult = await checkUsingNickname(nickname);
			if (isNicknameRsult) {
				setNicknameCheck(true);
				setNicknameCheckFeedback('');
			} else {
				setNicknameCheck(false);
				setNicknameCheckFeedback('이미 존재하는 닉네임 입니다');
			}
		} else {
			setNicknameCheck(true);
			setNicknameCheckFeedback('닉네임을 입력해 주세요');
		}
	}, [nickname]);

	const handlePasswordBlur = useCallback(() => {
		const passwordCheckResult = checkPassword(password);
		if (passwordCheckResult.success) {
			setPasswordCheck(true);
			setpasswordCheckFeedback('');
		} else {
			setPasswordCheck(false);
			setpasswordCheckFeedback(passwordCheckResult.message as string);
		}
	}, [password]);

	const handleComfirmPasswordBlur = useCallback(() => {
		if (password === confirmPassword) {
			setConfirmPasswordCheck(true);
			setConfirmPasswordCheckFeedback('');
		} else {
			setConfirmPasswordCheck(false);
			setConfirmPasswordCheckFeedback('비밀번호가 일치하지 않습니다');
		}
	}, [password, confirmPassword]);

	const handleSignupSubmit = useCallback(
		(event) => {
			event.preventDefault();
			dispatch(signup({ email, password, nickname, passwordCheck: confirmPassword }));
		},
		[email, emailCheck, password, passwordCheck, nickname, nicknameCheck, confirmPassword, confirmPasswordCheck],
	);

	return (
		<div className={classes.container}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography variant="h1" component="h1" className={classes.title}>
						Sign Up
					</Typography>
					<img src={coverImage} alt="signup-image" className={classes.mainImage} />
					<form className={classes.form} noValidate onSubmit={handleSignupSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									error={!emailCheck}
									variant="outlined"
									required
									fullWidth
									id="Email"
									label="이메일"
									name="Email"
									autoComplete="lname"
									value={email}
									onChange={handleChangeEmail}
									onBlur={handleEmailBlur}
								/>
								<span>{emailCheckFeedback}</span>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={!nicknameCheck}
									variant="outlined"
									required
									fullWidth
									id="nickname"
									label="닉네임"
									name="nickname"
									autoComplete="nickname"
									value={nickname}
									onChange={handleChangeNickname}
									onBlur={handleNicknameBlur}
								/>
								<span>{nicknameCheckFeedback}</span>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={!passwordCheck}
									variant="outlined"
									required
									fullWidth
									name="password"
									label="비밀번호"
									type="password"
									id="password"
									autoComplete="password"
									value={password}
									onChange={handleChangePassword}
									onBlur={handlePasswordBlur}
								/>
								<span>{passwordCheckFeedback}</span>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={!confirmPasswordCheck}
									variant="outlined"
									required
									fullWidth
									name="confirm-password"
									label="비밀번호 확인"
									type="password"
									id="confirm-password"
									autoComplete="confirm-password"
									value={confirmPassword}
									onChange={handleChangeConfirmPassword}
									onBlur={handleComfirmPasswordBlur}
								/>
								<span>{confirmPasswordCheckFeedback}</span>
							</Grid>
						</Grid>
						<Typography className={classes.textRight}>
							<Link to="/signin" className={classes.link}>
								계정이 이미 있으신가요?
							</Link>
						</Typography>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={
								!emailCheck ||
								!passwordCheck ||
								!nicknameCheck ||
								!confirmPasswordCheck ||
								!email.length ||
								!nickname.length
							}
						>
							회원가입
						</Button>
						<Grid container justifyContent="flex-end"></Grid>
					</form>
				</div>
			</Container>
		</div>
	);
}
