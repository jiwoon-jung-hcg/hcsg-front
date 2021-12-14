import React, { useState, useCallback, useEffect, useRef, RefObject } from 'react';
import { Typography, Button, CssBaseline, Grid, Container, CircularProgress } from '@material-ui/core';

import ErrorPage from '../../components/ErrorComponent/ErrorPage';
import Loading from '../../components/LoadingComponent/Loading';
import MainNave from '../../components/NavComponent/MainNav';
import PostComponent from '../../components/PostComponent/PostComponent';
import useStyles from '../../styles/mui/home/styles';
import { Post, ResponseGetPosts, Sort } from '../../types/Home';
import { logger } from '../../utils/logger';
import HeaderComponent from './HeaderComponent';
import StackNavComponent from './StackNavComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getFilterPosts, getPosts, REFRESH_LIST } from '../../modules/post';
import SortComponent from './SortComponent';

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const post = useSelector((state: RootState) => state.post);
	const [isLoading, setIsLoading] = useState(true);
	const [postListLoading, setPostListLoading] = useState(true);
	const [postLoading, setPostLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [sort, setSort] = useState<Sort>('descending');
	const [offset, setOffset] = useState(1);
	const [limit] = useState(6);
	const [selectStacks, setSelectStacks] = useState<string[]>([]);
	const stackRef: RefObject<HTMLDivElement> = useRef(null);

	/** Side Effect */
	/** unMount */
	useEffect(() => {
		return () => {
			dispatch({ type: REFRESH_LIST });
		};
	}, []);
	/** 더보기, 스택, 정렬 버튼 포스트 추가호출 */
	useEffect(() => {
		setPostListLoading(true);
		dispatch(getPosts({ sort, limit, offset, stacks: selectStacks }));
		setIsLoading(false);
		setPostLoading(false);
	}, [offset, selectStacks, sort]);

	/** Event Handler */
	/** 더보기 버튼 클릭 */
	const handleMoreButtonClick = useCallback(() => {
		setOffset((offset) => ++offset);
		setPostLoading(true);
	}, [offset]);
	/** 정렬 방식 변경 */
	const handleChangeSort = useCallback((event: React.MouseEvent<HTMLHeadingElement>) => {
		console.log(event.currentTarget.textContent);
		setSort(event.currentTarget.textContent?.trim() === '인기' ? 'hit' : 'descending');
	}, []);
	/** 스택 필터링 */
	const updateStack = useCallback((stack: string) => {
		setSelectStacks((prevStaks) => {
			const findStack = prevStaks.find((el) => el === stack);
			return findStack ? prevStaks.filter((el) => el !== findStack) : [...prevStaks, stack];
		});
	}, []);

	/** etc */
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
	/** 더보기 버튼 */
	const returnComponentThatisLoadingToClickButton = useCallback(() => {
		{
			return postLoading ? (
				<CircularProgress />
			) : (
				!post.lastPage && (
					<Button color="primary" variant="outlined" onClick={handleMoreButtonClick}>
						더 보기
					</Button>
				)
			);
		}
	}, [postLoading, post]);

	/** Render */
	/** 게시글 리스트 리턴 함수 */
	const renderPosts = useCallback(() => {
		const data = post?.posts;
		return Array.isArray(data) && data.length ? (
			data.map((post: Post) => <PostComponent key={post.id} post={post} />)
		) : (
			<Typography variant="h3">작성하신 컨텐츠가 없습니다</Typography>
		);
	}, [post]);
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
					<SortComponent handleChangeSort={handleChangeSort} />
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
