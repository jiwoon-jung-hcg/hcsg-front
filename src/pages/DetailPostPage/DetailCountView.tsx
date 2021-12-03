import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useStyles from '../../stylesheets/detailPost/styles';
import { DetailPost } from './DetailPostPage';

interface Iprops {
	post: DetailPost;
}

export default function DetailCountView(props: Iprops) {
	const classes = useStyles();
	const { post } = props;
	return (
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
	);
}
