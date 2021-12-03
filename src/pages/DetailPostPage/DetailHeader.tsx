import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import useStyles from '../../stylesheets/detailPost/styles';
import profile from '../../images/defaultProfile.png';
import { DetailPost } from './DetailPostPage';

interface Iprops {
	post: DetailPost;
}

export default function DetailHeader(props: Iprops) {
	const { post } = props;
	const classes = useStyles();
	return (
		<>
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
		</>
	);
}
