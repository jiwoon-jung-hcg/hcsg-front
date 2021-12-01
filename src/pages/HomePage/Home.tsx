// module
import React, { useState, useCallback, useEffect, useRef, RefObject } from 'react';
// import { DefaultRootState, RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Typography, Button, CssBaseline, Grid, Container, CircularProgress } from '@material-ui/core';

// component
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import Loading from '../../components/Loading/Loading';
import MainNave from '../../components/Nav/MainNav';
import PostComponent from '../../components/Post/PostComponent';

// style
import useStyles from '../../stylesheets/home/styles';

// type
import { Post, ResponseGetPosts } from '../../types/Home';

// action

// reducer
// import { UserState } from '../../_reducers/userReducer';

// utils
// import { CookieSingleton } from '../../utils/cookie';
import { logger } from '../../utils/logger';
import { getPosts } from '../../apis/home/home';
import HeaderComponent from './HeaderComponent';
import StackNavComponent from './StackNavComponent';

const Home = () => {
	const classes = useStyles();
	// const { isAuth, loginSuccess, data } = useSelector<RootStateOrAny, UserState>((state) => state.user);
	// const storePost = useSelector<RootStateOrAny, Post[]>((state) => state.post);
	// const dispatch = useDispatch();
	const [posts, setPosts] = useState<Post[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [postLoading, setPostLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	// const [sort, setSort] = useState<Sort>('descending');
	const [page, setPage] = useState(1);
	const [isLastPost, setIsLastPost] = useState(false);
	const [selectStacks, setSelectStacks] = useState<string[]>([]);
	const stackRef: RefObject<HTMLDivElement> = useRef(null);
	useEffect(() => {
		getPosts(selectStacks, page)
			.then((response) => {
				const { posts, last_page }: ResponseGetPosts = response;
				last_page ? setIsLastPost(true) : setIsLastPost(false);
				setPosts((prevPosts) => {
					if (prevPosts) {
						return [...prevPosts, ...posts];
					} else {
						return [...posts];
					}
				});
			})
			.catch((error) => {
				logger(error);
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
				setPostLoading(false);
			});
	}, [page]);

	useEffect(() => {
		getPosts(selectStacks, page)
			.then((response) => {
				const { posts, last_page }: ResponseGetPosts = response;
				last_page ? setIsLastPost(true) : setIsLastPost(false);
				setPosts([...posts]);
			})
			.catch((error) => {
				logger(error);
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
				setPostLoading(false);
			});
	}, [selectStacks]);

	/** 더보기 버튼 클릭 */
	const handleMoreButtonClick = useCallback(() => {
		setPage((page) => ++page);
		setPostLoading(true);
	}, [page]);

	/** 스택 필터링 */
	const updateStack = useCallback((stack: string) => {
		setPage(1);
		setSelectStacks((prevStaks) => {
			const findStack = prevStaks.find((el) => el === stack);
			return findStack ? prevStaks.filter((el) => el !== findStack) : [...prevStaks, stack];
		});
	}, []);

	/** 필터 처리 로직 */
	const feedbackFilter = useCallback(() => {
		const target = stackRef.current && stackRef.current.children;
		if (target) {
			const children = Array.from(target);
			children.forEach((el) => {
				el.firstElementChild?.classList[1] !== 'active-image' && el.firstElementChild?.classList.add('un-active-image');
			});
			console.log(children.findIndex((el) => el.firstElementChild?.classList[1] === 'active-image'));
			if (children.findIndex((el) => el.firstElementChild?.classList[1] === 'active-image') === -1) {
				children.forEach((el) => {
					el.firstElementChild?.classList.remove('un-active-image');
				});
			}
		}
	}, []);

	const renderPosts = useCallback(() => {
		return posts ? (
			posts.map((post) => <PostComponent key={post.id} post={post} />)
		) : (
			<Typography variant="h3">작성된 컨텐츠가 없습니다</Typography>
		);
	}, [posts]);

	const returnComponentThatisLoadingToClickButton = useCallback(() => {
		{
			return postLoading ? (
				<CircularProgress />
			) : (
				!isLastPost && (
					<Button color="primary" variant="outlined" onClick={handleMoreButtonClick}>
						더 보기
					</Button>
				)
			);
		}
	}, [postLoading, isLastPost]);

	/** 로딩페이지 */
	if (isLoading) {
		return <Loading />;
	}

	/** 에러페이지 */
	if (isError) {
		return <ErrorPage />;
	}

	return (
		<>
			<CssBaseline />
			<nav>
				<MainNave />
			</nav>
			<main>
				<header>
					<HeaderComponent />
				</header>
				<StackNavComponent stackRef={stackRef} updateStack={updateStack} feedbackFilter={feedbackFilter} />
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid container spacing={4}>
						{renderPosts()}
					</Grid>
					<div className={classes.loadingContainer}>{returnComponentThatisLoadingToClickButton()}</div>
				</Container>
			</main>
			<footer></footer>
		</>
	);
};

export default Home;
