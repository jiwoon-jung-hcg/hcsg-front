import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../../stylesheets/home/styles';
import mainLogo from '../../images/mainLogo.png';
import { useNavigate } from 'react-router';

export default function MainNav() {
	const classes = useStyles();
	const navigate = useNavigate();

	const handleLogoClick = useCallback(() => {
		navigate('/');
	}, []);

	return (
		<div className={classes.navRoot}>
			<AppBar position="relative" className={classes.nav}>
				<Toolbar>
					<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
						<img
							src={mainLogo}
							alt="main logo"
							style={{ marginRight: '8px', width: 100, cursor: 'pointer' }}
							onClick={handleLogoClick}
						/>
					</div>
					{/* auth 체크 */}
					<Typography variant="h5" color="textPrimary" className={classes.menu}>
						<Link to="/signin" style={{ textDecoration: 'none', color: '#303f9f', fontWeight: '900' }}>
							로그인
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
