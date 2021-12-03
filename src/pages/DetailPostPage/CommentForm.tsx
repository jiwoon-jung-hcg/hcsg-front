import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../../stylesheets/detailPost/styles';
import { DetailPost } from './DetailPostPage';

interface Iprops {
	post: DetailPost;
}

export default function CommentForm(props: Iprops) {
	const classes = useStyles();
	const { post } = props;
	return (
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
	);
}
