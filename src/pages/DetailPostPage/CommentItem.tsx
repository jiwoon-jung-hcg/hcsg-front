import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Comment } from './DetailPostPage';
import profile from '../../images/defaultProfile.png';
import useStyles from '../../styles/mui/detailPost/styles';
interface Iprops {
	comment: Comment;
}

export default function CommentItem(props: Iprops) {
	const classes = useStyles();
	const { comment } = props;
	return (
		<Grid key={comment.id} item className={classes.commentContainer}>
			<div className={classes.commentHeader}>
				<Avatar alt="author profile" src={profile} />
				<div>
					<Typography variant="h5">{comment.commenterNickname}</Typography>
					<Typography variant="h6">{comment.updatedAt}</Typography>
				</div>
			</div>
			<Typography className={classes.commentContent} variant="body1">
				{comment.content}
			</Typography>
		</Grid>
	);
}
