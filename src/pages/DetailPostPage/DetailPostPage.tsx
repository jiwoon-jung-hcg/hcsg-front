import { Avatar, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorPage from '../../components/ErrorComponent/ErrorPage';
import Loading from '../../components/LoadingComponent/Loading';
import MainNav from '../../components/NavComponent/MainNav';
import useStyles from '../../styles/mui/detailPost/styles';

import profile from '../../images/defaultProfile.png';
import DetailHeader from './DetailHeader';
import DetailStackContainer from './DetailStackContainer';
import DetailContent from './DetailContent';
import DetailCountView from './DetailCountView';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { headerConfig } from '../../apis/user/user';

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
	const content = useRef<HTMLElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [comments, setcomments] = useState<Comment[]>([]);
	const [post, setPost] = useState<DetailPost>({
		id: 0,
		title: '',
		stacks: [],
		content: '',
		createdAt: '',
		updatedAt: '',
		hit: 0,
		likesCount: 0,
		commentsCount: 0,
		authorNickname: '',
	});

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
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${params.id}`, headerConfig())
			.then((response) => {
				const detailPost: DetailPost = response?.data;
				setPost({ ...detailPost });
			})
			.catch((err) => {
				console.dir(err);
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleBackClick = useCallback(() => navigate('/'), []);

	if (isLoading) return <Loading />;
	if (isError) return <ErrorPage />;

	return (
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
					<DetailHeader post={post} />
					<DetailStackContainer post={post} />
					<DetailContent post={post} content={content} />
					<DetailCountView post={post} />
					<CommentForm post={post} />
				</main>
				<footer>
					<CommentList comments={comments} />
				</footer>
			</Container>
		</div>
	);
}
