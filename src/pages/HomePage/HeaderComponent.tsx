import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import useStyles from '../../stylesheets/home/styles';
import { useNavigate } from 'react-router';

export default function HeaderComponent() {
	const navigate = useNavigate();
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Container maxWidth="sm">
				<Typography variant="h2" align="center" className={classes.mainTItle} gutterBottom>
					휴먼 컨설팅 스터디
				</Typography>
				<Typography variant="h5" align="center" color="textSecondary" paragraph>
					스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법
					<br />
					저희와 함께 팀원을 찾아볼래요?
				</Typography>
				<div className={classes.button}>
					<Grid container spacing={2} justifyContent="center">
						<Grid item>
							<Button variant="contained" color="primary" size="large" onClick={() => navigate('/post/new')}>
								팀원 모집하기
							</Button>
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
}
