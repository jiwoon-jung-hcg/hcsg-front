import React from 'react';
import {
	Typography,
	AppBar,
	Button,
	Card,
	CardContent,
	CardMedia,
	CssBaseline,
	Grid,
	Toolbar,
	Container,
} from '@material-ui/core';
import useStyles from '../../stylesheets/home/styles';
import mainLogo from '../../images/Logo.png';
import { Link } from 'react-router-dom';
import stack from '../../utils/imageE';

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const Home = () => {
	const classes = useStyles();
	return (
		<>
			<CssBaseline />
			<div className={classes.navRoot}>
				<AppBar position="relative" className={classes.nav}>
					<Toolbar>
						<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
							<img src={mainLogo} alt="main logo" style={{ marginRight: '8px' }} />
							<Typography variant="h3" className={classes.title}>
								HCSG
							</Typography>
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

			<main>
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
									<Button variant="contained" color="primary" size="large">
										팀원 모집하기
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<nav>
					<div className={classes.stackContainer}>
						<Grid container spacing={2} justifyContent="center" alignItems="center">
							{stack.map((item) => (
								<Grid key={item.title} item>
									<img src={item.url} alt={item.title} className={classes.stack} />
								</Grid>
							))}
						</Grid>
					</div>
				</nav>
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid container spacing={4}>
						{cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography variant="h5" gutterBottom>
											모집글 제목
										</Typography>
										<Typography>여기는 기술 스택 이미지 들어갈거임</Typography>
										<Typography>조회수 댓글수 좋아요수</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					푸터 넣을까 말까 고민중
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary">
					뭐라도 넣어봐야지 않겠어? ㅋ
				</Typography>
			</footer>
		</>
	);
};

export default Home;
