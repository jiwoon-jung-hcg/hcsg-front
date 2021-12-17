import React, { useCallback } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useStyles from '../../styles/mui/detailPost/styles';
import { DetailPost } from './DetailPostPage';
import { useDispatch, useSelector } from 'react-redux';
import { likePostAction } from '../../modules/post';
import { RootState } from '../../modules';

interface Iprops {
	post: DetailPost;
}

export default function DetailCountView(props: Iprops) {
	const classes = useStyles();
	const { auth } = useSelector((state: RootState) => state);
	const { post } = props;
	const dispatch = useDispatch();
	const handleLikeClick = useCallback(() => {
		auth.is_auth && dispatch(likePostAction(post.id));
	}, [auth, post]);
	return (
		<Grid container>
			<Grid item style={{ flexGrow: 1 }}></Grid>
			<Grid item className={classes.count}>
				<FavoriteIcon
					onClick={handleLikeClick}
					className={classes.likeButton}
					style={{ color: post.liked ? '#ee4343' : '' }}
				/>
				<Typography variant="caption" component="span">
					{post.likes_count}
				</Typography>
			</Grid>
			<Grid item className={classes.count}>
				<VisibilityIcon style={{ color: '#6baee5' }} />
				<Typography variant="caption" component="span">
					{post.hit}
				</Typography>
			</Grid>
		</Grid>
	);
}
