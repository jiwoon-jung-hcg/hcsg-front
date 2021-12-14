import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { createComentAction } from '../../modules/comment';
import useStyles from '../../styles/mui/detailPost/styles';
import { DetailPost } from './DetailPostPage';

interface Iprops {
	post: DetailPost;
}

export default function CommentForm(props: Iprops) {
	const classes = useStyles();
	const { post } = props;
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const comment = useSelector((state: RootState) => state.comment);

	const handleChangeComment = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setContent(event.currentTarget.value);
	}, []);

	const handleCreateCommentClick = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			dispatch(createComentAction({ postId: post.id, content }));
			setContent('');
		},
		[content, post.id],
	);

	return (
		<form onSubmit={handleCreateCommentClick}>
			<Grid container direction="column">
				<Grid item container justifyContent="space-between">
					<Grid item>
						<Typography variant="h4" className={classes.commentCount}>
							{comment.comments.length}개의 댓글이 있습니다.
						</Typography>
					</Grid>
					<Grid item>
						<Button type="submit" variant="text" color="primary" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
							작성
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<TextField
						variant="outlined"
						fullWidth
						margin="normal"
						multiline
						minRows={4}
						maxRows={4}
						placeholder="댓글을 입력하세요."
						className={classes.commentBox}
						value={content}
						onChange={handleChangeComment}
					/>
				</Grid>
			</Grid>
		</form>
	);
}
