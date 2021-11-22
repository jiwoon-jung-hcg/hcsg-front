import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { emailNullCheck, passwordNullCheck, checkEmail, checkInfo } from './validation/singInValidation';

/** validation 함수 */

/** type */

const useStyles = makeStyles((theme) => ({
	container: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
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
	},
}));

export default function SignInPage() {
	const classes = useStyles();
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
			event.preventDefault();
			const { email, password } = event.currentTarget;

			if (
				checkInfo(
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
			}
		},
		[email, password],
	);

	return (
		<div className={classes.container}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						<img src="images/logo2.png" alt="logo" className="" />
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
						<span>{emailCheckFeedBack}</span>
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
						<span>{passwordCheckFeedBack}</span>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}
							style={{ backgroundColor: '#5ea0a2', color: 'white' }}
						>
							로그인
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2" style={{ color: '#63A0BA' }}>
									패스워드 찾기
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2" style={{ color: '#63A0BA' }}>
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
