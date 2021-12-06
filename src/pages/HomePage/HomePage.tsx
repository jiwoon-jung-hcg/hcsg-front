// module
import React, { useState, useCallback, useEffect, useRef, RefObject } from 'react';
// import { DefaultRootState, RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Typography, Button, CssBaseline, Grid, Container, CircularProgress } from '@material-ui/core';

// component
import ErrorPage from '../../components/ErrorComponent/ErrorPage';
import Loading from '../../components/LoadingComponent/Loading';
import MainNave from '../../components/NavComponent/MainNav';
import PostComponent from '../../components/PostComponent/PostComponent';

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
	const [skip, setSkip] = useState(false);
	const stackRef: RefObject<HTMLDivElement> = useRef(null);
	/** 더보기 버튼눌렀을때 포스트 추가호출 */
	useEffect(() => {
		if (skip) {
			setSkip(false);
			return;
		}
		getPosts(selectStacks, page)
			.then((response) => {
				const { posts, last_page }: ResponseGetPosts = response;
				last_page ? setIsLastPost(true) : setIsLastPost(false);
				setPosts((prevPosts) => {
					if (prevPosts?.length) {
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
	}, [skip]);

	/** 스택 필터 버튼눌렀을때 포스트 추가호출 */
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

	/** 핸들러: 더보기 버튼 클릭 */
	const handleMoreButtonClick = useCallback(() => {
		setPage((page) => ++page);
		setSkip((prev) => !prev);
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
		// 필터 스택 컨테이너 밑에있는 요소들을 다 가져온다.
		const target = stackRef.current && stackRef.current.children;
		if (target) {
			// HTML 컬렉션을 배열로 변환
			const children = Array.from(target);
			// 스택요소들을 순환
			children.forEach((el) => {
				// 만약 요소의 클래스에 'active-image'가 아니라면(선택이 안되어있다면), 비활성화 클래스할당
				el.firstElementChild?.classList[1] !== 'active-image' && el.firstElementChild?.classList.add('un-active-image');
			});
			if (children.findIndex((el) => el.firstElementChild?.classList[1] === 'active-image') === -1) {
				children.forEach((el) => {
					el.firstElementChild?.classList.remove('un-active-image');
				});
			}
		}
	}, []);

	/** 게시글 리스트 리턴 함수 */
	const renderPosts = useCallback(() => {
		return posts ? (
			posts.map((post) => <PostComponent key={post.id} post={post} />)
		) : (
			<Typography variant="h3">작성된 컨텐츠가 없습니다</Typography>
		);
	}, [posts]);

	/** 더보기 버튼 */
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
			<main style={{ width: '100%', backgroundColor: 'white' }}>
				<header>
					<HeaderComponent />
				</header>
				<StackNavComponent stackRef={stackRef} updateStack={updateStack} feedbackFilter={feedbackFilter} />
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid container spacing={4} style={{ backgroundColor: 'white', marginTop: '1vw' }}>
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
