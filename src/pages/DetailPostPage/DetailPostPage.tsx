import { Avatar, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { headerConfig } from '../../apis/signUp/signUp';
import ErrorPage from '../../components/ErrorComponent/ErrorPage';
import Loading from '../../components/LoadingComponent/Loading';
import MainNav from '../../components/NavComponent/MainNav';
import useStyles from '../../stylesheets/detailPost/styles';

import profile from '../../images/defaultProfile.png';

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
	updated_at: string;
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
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${params.id}/comments`, headerConfig)
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
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${params.id}`, headerConfig)
			.then((response) => {
				const detailPost: DetailPost = response?.data;
				console.log(detailPost);
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
					<Typography variant="h3" color="textPrimary" className={classes.title}>
						{post.title}
					</Typography>
					<Grid container justifyContent="space-between" alignItems="center" className={classes.subtitle}>
						<Grid item className={classes.profile}>
							<Avatar alt="author profile" src={profile} className={classes.profileImage} />
							<Typography variant="h5">{post.authorNickname}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h5" color="inherit" className={classes.date}>
								{post.createdAt}
							</Typography>
						</Grid>
					</Grid>
					<section className={classes.stackContainer}>
						<Typography variant="h5">사용 언어: </Typography>
						<ul className={classes.stackList}>
							{post.stacks.map((stack) => (
								<li key={stack} className={classes.stackItem}>
									{stack}
								</li>
							))}
						</ul>
					</section>
					<section
						className={classes.content}
						ref={content}
						dangerouslySetInnerHTML={{ __html: post.content }}
					></section>
					<Grid container>
						<Grid item style={{ flexGrow: 1 }}></Grid>
						<Grid item className={classes.count}>
							<FavoriteIcon />
							<Typography variant="caption" component="span">
								{post.likesCount}
							</Typography>
						</Grid>
						<Grid item className={classes.count}>
							<VisibilityIcon />
							<Typography variant="caption" component="span">
								{post.hit}
							</Typography>
						</Grid>
					</Grid>
					<form>
						<Typography variant="h4" className={classes.commentCount}>
							{post.commentsCount}개의 댓글이 있습니다.
						</Typography>
						<TextField
							variant="outlined"
							fullWidth
							margin="normal"
							placeholder="댓글을 입력하세요."
							className={classes.commentBox}
						/>
					</form>
				</main>
				<footer>
					<Grid container direction="column">
						{comments.map((comment) => (
							<Grid key={comment.id} item className={classes.commentContainer}>
								<div className={classes.commentHeader}>
									<Avatar alt="author profile" src={profile} />
									<div>
										<Typography variant="h5">{comment.commenterNickname}</Typography>
										<Typography variant="h6">{comment.updated_at}</Typography>
									</div>
								</div>
								<Typography className={classes.commentContent} variant="body1">
									{comment.content}
								</Typography>
							</Grid>
						))}
					</Grid>
				</footer>
			</Container>
		</div>
	);
}
