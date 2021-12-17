import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../../styles/mui/home/styles';
import mainLogo from '../../images/mainLogo.png';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import Cookies from 'universal-cookie';

export default function MainNav() {
	const cookie = new Cookies();
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [, updateState] = useState({});
	const { auth, user } = useSelector((state: RootState) => state);

	const renderUserLogin = useCallback(() => {
		return (
			<Grid>
				{auth.nickname ? (
					<Link style={{ color: 'black', cursor: 'pointer' }} to={`/user/${auth.userId}`}>
						{auth.nickname}님 환영합니다!
					</Link>
				) : (
					<Link to="/user/signin" style={{ textDecoration: 'none', color: '#303f9f', fontWeight: '900' }}>
						로그인
					</Link>
				)}
			</Grid>
		);
	}, [auth, user.logoutSuccess]);

	return (
		<div className={classes.navRoot}>
			<AppBar position="relative" className={classes.nav}>
				<Toolbar>
					<Grid container alignItems="center">
						<Grid item style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
							<img src={mainLogo} alt="main logo" style={{ marginRight: '8px', width: 100, cursor: 'pointer' }} />
						</Grid>
						<Grid style={{ marginRight: '20px' }}>
							<Link to="/post/new" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
								새 글 쓰기
							</Link>
						</Grid>
						{renderUserLogin()}
						<Typography variant="h5" color="textPrimary" className={classes.menu}></Typography>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
}
