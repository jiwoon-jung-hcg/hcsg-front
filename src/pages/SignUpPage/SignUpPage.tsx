import * as React from 'react';
import { useState, useCallback } from 'react';

// css
import '../../sass/_signup.scss';

// MUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { Router, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '5vw',
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
}));

export default function SignUpPage() {
	const classes = useStyles();

	const [email, setEmail] = useState<string>('');
	const [nickname, setNickname] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

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

	return (
		<div className={classes.container}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<img src="images/signup.jpg" alt="signup-image" className={classes.mainImage} />
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="Email"
									label="이메일"
									name="Email"
									autoComplete="lname"
									value={email}
									onChange={handleChangeEmail}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="nickname"
									label="닉네임"
									name="nickname"
									autoComplete="nickname"
									value={nickname}
									onChange={handleChangeNickname}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
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
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
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
								/>
							</Grid>
						</Grid>
						<Typography>
							<Link to="/login" className="link">
								계정이 이미 있으신가요?
							</Link>
						</Typography>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							회원가입
						</Button>
						<Grid container justifyContent="flex-end"></Grid>
					</form>
				</div>
			</Container>
		</div>
	);
}
