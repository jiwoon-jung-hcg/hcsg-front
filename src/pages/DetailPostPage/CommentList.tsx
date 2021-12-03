import React from 'react';
import { Grid } from '@material-ui/core';
import { Comment } from './DetailPostPage';
import useStyles from '../../stylesheets/detailPost/styles';
import CommentItem from './CommentItem';

interface Iprops {
	comments: Comment[];
}

export default function CommentList(props: Iprops) {
	const classes = useStyles();
	const { comments } = props;
	return (
		<Grid container direction="column">
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</Grid>
	);
}
