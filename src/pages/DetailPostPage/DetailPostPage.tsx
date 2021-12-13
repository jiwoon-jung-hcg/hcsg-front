import { Container, CssBaseline, Grid, Typography } from '@material-ui/core';

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
import { deletePost, getDetailPost, REFRESH_DETAIL_POST } from '../../modules/post';
import { RootState } from '../../modules';
import { headerConfig } from '../../utils/axiosHeader';

export interface DetailPost {
	id: number;
	title: string;
	stacks: string[];
	content: string;
	created_at: string;
	updated_at: string;
	hit: number;
	likes_count: number;
	comments_count: number;
	author_nickname: string;
	liked: boolean;
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
	const { selectedPost, successfullyDeleted } = useSelector((state: RootState) => state.post);
	const { auth, post } = useSelector((state: RootState) => state);
	const content = useRef<HTMLElement>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const { nickname } = auth;

	useEffect(() => {
		dispatch(getDetailPost(params.id));
		setIsLoading(false);
	}, []);

	useEffect(() => {
		successfullyDeleted && navigate('/');
	}, [successfullyDeleted]);

	useEffect(() => {
		return () => {
			dispatch({ type: REFRESH_DETAIL_POST });
		};
	}, []);

	const handleBackClick = useCallback(() => navigate('/'), []);
	const handleUpdateClick = useCallback(() => navigate('/post/update'), []);
	const handleDeleteClick = useCallback(() => selectedPost && dispatch(deletePost(selectedPost.id)), [selectedPost]);

	if (isLoading) return <div>dfsjdfoijsdfiojsdfiojsodijfoisjdof</div>;
	if (isError) return <ErrorPage />;

	return (
		selectedPost && (
			<div className={classes.container}>
				<CssBaseline />
				<MainNav />
				<Container maxWidth="md" className={classes.main}>
					<nav>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography variant="h4">
									<KeyboardBackspaceIcon className={classes.back} onClick={handleBackClick} />
								</Typography>
							</Grid>
							{selectedPost.author_nickname === nickname && (
								<Grid>
									<Grid container alignItems="center" spacing={4}>
										<Grid item>
											<Typography
												variant="h5"
												color="textSecondary"
												className={classes.textButton}
												onClick={handleUpdateClick}
											>
												수정
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant="h5"
												color="secondary"
												className={classes.textButton}
												onClick={handleDeleteClick}
											>
												삭제
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							)}
						</Grid>
					</nav>
					<main>
						<DetailHeader post={selectedPost} />
						<DetailStackContainer post={selectedPost} />
						<DetailContent post={selectedPost} content={content} />
						<DetailCountView post={selectedPost} />
						{auth.is_atuh && <CommentForm post={selectedPost} />}
					</main>
					<footer>
						<CommentList />
					</footer>
				</Container>
			</div>
		)
	);
}
