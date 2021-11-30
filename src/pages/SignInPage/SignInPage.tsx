import * as React from 'react';
import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

/** mui */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/** type */
import { logInResponse } from '../../types/signInType';

/** validation 함수 */
import { isNullCheck, checkLoginInfo, checkLoginResponse } from '../../utils/validation';

/** component */
import Loading from '../../components/Loading/Loading';
import { userLogin } from '../../apis/signIn/signIn';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

/** image */
import coverImage from '../../images/signin.jpg';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { logger } from '../../utils/logger';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '5vw',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: '3.5em',
		fontWeight: 'bold',
		color: '#5ea0a2',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#5ea0a2',
		color: 'white',
	},
	mainImage: {
		width: '100%',
		borderRadius: '10%',
	},
	text: {
		color: '#a3a3a3',
		textDecoration: 'none',
	},
	errorText: {
		color: '#ff6666',
	},
}));

export default function SignInPage() {
	const classes = useStyles();
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [emailCheck, setEmailCheck] = useState<boolean>(true);
	const [passwordCheck, setPasswordCheck] = useState<boolean>(true);
	const [emailCheckFeedBack, setEmailCheckFeedBack] = useState<string>('');
	const [passwordCheckFeedBack, setpasswordCheckFeedBack] = useState<string>('');

	/** 이메일 입력 */
	const handleInputEmail = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(event.currentTarget.value);
		},
		[email],
	);

	/** 패스워드 입력 */
	const handleInputPassword = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(event.currentTarget.value);
		},
		[password],
	);

	/** 로그인 */
	const handleFormSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			try {
				event.preventDefault();
				const { email, password } = event.currentTarget;
				if (
					checkLoginInfo(
						email.value,
						password.value,
						setEmailCheck,
						setPasswordCheck,
						setEmailCheckFeedBack,
						setpasswordCheckFeedBack,
					)
				) {
					const loginInfo = {
						email: email.value,
						password: password.value,
					};
					userLogin(loginInfo)
						.then((res: logInResponse) => {
							checkLoginResponse(
								res,
								setEmailCheck,
								setPasswordCheck,
								setEmailCheckFeedBack,
								setpasswordCheckFeedBack,
								navigate,
							);
						})
						.catch((err) => {
							logger(err);
							setIsError(true);
						});
				}
			} catch (err) {
				logger(err);
				setIsError(true);
			}
		},
		[email, password],
	);

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<div className={classes.container}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography variant="h1" component="h1" className={classes.title}>
						Login
					</Typography>
					<Typography component="h1" variant="h5">
						<img src={coverImage} alt="logo" className={classes.mainImage} />
					</Typography>
					<form className={classes.form} onSubmit={handleFormSubmit} noValidate>
						<TextField
							error={!emailCheck}
							type="email"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="이메일"
							name="email"
							value={email}
							autoComplete="email"
							autoFocus
							onChange={handleInputEmail}
						/>
						<span className={classes.errorText}>{emailCheckFeedBack}</span>
						<TextField
							error={!passwordCheck}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="비밀번호"
							type="password"
							id="password"
							value={password}
							autoComplete="current-password"
							onChange={handleInputPassword}
						/>
						<span className={classes.errorText}>{passwordCheckFeedBack}</span>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}
							disabled={isNullCheck(email) || isNullCheck(password)}
						>
							로그인
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="#" className={classes.text}>
									패스워드 찾기
								</Link>
							</Grid>
							<Grid item>
								<Link to="/signup" className={classes.text}>
									회원가입
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
}
