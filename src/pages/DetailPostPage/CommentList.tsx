import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Comment } from './DetailPostPage';
import CommentItem from './CommentItem';
import { useDispatch, useSelector } from 'react-redux';
import { createComentAction, getCommentsAction, REFRESH_COMMENT } from '../../modules/comment';
import { RootState } from '../../modules';

export default function CommentList() {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state);
	const { post, comment } = state;

	useEffect(() => {
		post.selectedPost && dispatch(getCommentsAction(post.selectedPost.id));
	}, [comment.changed, post.selectedPost?.id]);

	useEffect(() => {
		return () => {
			dispatch({ type: REFRESH_COMMENT });
		};
	}, []);

	return (
		<Grid container direction="column">
			{comment.commnets?.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</Grid>
	);
}
