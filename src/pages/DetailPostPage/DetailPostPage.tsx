import { Container, CssBaseline, Typography } from '@material-ui/core';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorPage from '../../components/ErrorComponent/ErrorPage';
import Loading from '../../components/LoadingComponent/Loading';
import MainNav from '../../components/NavComponent/MainNav';
import useStyles from '../../styles/mui/detailPost/styles';

import DetailHeader from './DetailHeader';
import DetailStackContainer from './DetailStackContainer';
import DetailContent from './DetailContent';
import DetailCountView from './DetailCountView';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPost } from '../../modules/post';
import { RootState } from '../../modules';
import { headerConfig } from '../../utils/axiosHeader';

export interface DetailPost {
	id: number;
	title: string;
	stacks: string[];
	content: string;
	createdAt: string;
	updatedAt: string;
	hit: number;
	likesCount: number;
	commentsCount: number;
	authorNickname: string;
}

export interface Comment {
	id: number;
	commenterId: number;
	commenterNickname: string;
	content: string;
	updatedAt: string;
}

export default function DetailPostPage() {
	const classes = useStyles();
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { selectedPost } = useSelector((state: RootState) => state.post);
	const content = useRef<HTMLElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [comments, setcomments] = useState<Comment[]>([]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${params.id}/comments`, headerConfig())
			.then((response) => {
				const comments: Comment[] = response?.data;
				setcomments([...comments]);
			})
			.catch((err) => {
				console.dir(err);
				setIsError(true);
			});
	}, []);

	useEffect(() => {
		dispatch(getDetailPost(params.id));
		setIsLoading(false);
	}, []);

	const handleBackClick = useCallback(() => navigate('/'), []);

	if (isLoading) return <Loading />;
	if (isError) return <ErrorPage />;

	return (
		selectedPost && (
			<div className={classes.container}>
				<CssBaseline />
				<MainNav />
				<Container maxWidth="md" className={classes.main}>
					<nav>
						<Typography variant="h4">
							<KeyboardBackspaceIcon className={classes.back} onClick={handleBackClick} />
						</Typography>
					</nav>
					<main>
						<DetailHeader post={selectedPost} />
						<DetailStackContainer post={selectedPost} />
						<DetailContent post={selectedPost} content={content} />
						<DetailCountView post={selectedPost} />
						<CommentForm post={selectedPost} />
					</main>
					<footer>
						<CommentList comments={comments} />
					</footer>
				</Container>
			</div>
		)
	);
}
