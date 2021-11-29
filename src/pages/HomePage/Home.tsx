import React, { useState, useLayoutEffect } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
import mainLogo from '../../images/mainLogo.png';
import { Link } from 'react-router-dom';
import stack from '../../utils/imageE';
import { Post } from '../../types/Home';
import { getPosts } from '../../apis/home/home';
import Loading from '../../components/Loading/Loading';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import produce from 'immer';

const Home = () => {
	const classes = useStyles();
	const [posts, setPosts] = useState<Post[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useLayoutEffect(() => {
		try {
			getPosts().then((response) => {
				console.log(response);
				setPosts([...response]);
				setIsLoading(false);
			});
		} catch (error) {
			console.dir(error);
			console.log(error);
			setIsError(true);
		}
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<CssBaseline />
			<div className={classes.navRoot}>
				<AppBar position="relative" className={classes.nav}>
					<Toolbar>
						<div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
							<img src={mainLogo} alt="main logo" style={{ marginRight: '8px', width: 100 }} />
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
						{posts ? (
							posts.map((post) => (
								<Grid item key={post.id} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<CardContent className={classes.cardContent}>
											<Typography variant="h5" align="center" gutterBottom className={classes.cardTitle}>
												{post.title.slice(0, 15)}
											</Typography>
											<ul className={classes.postStack}>
												{post.stacks.map((keyword) => (
													<li key={keyword}>
														<img
															src={stack.find((stack) => stack.title === keyword)?.url}
															alt={keyword}
															className={classes.postStackImage}
														></img>
													</li>
												))}
											</ul>
											<Container>
												<div style={{ flexGrow: 1 }}></div>
												<Typography
													align="center"
													style={{ border: '1px solid  black', display: 'flex', justifyContent: 'center' }}
												>
													{<VisibilityIcon />}
													{post.hit}
												</Typography>
											</Container>
										</CardContent>
									</Card>
								</Grid>
							))
						) : (
							<Typography variant="h3">작성된 컨텐츠가 없습니다</Typography>
						)}
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
