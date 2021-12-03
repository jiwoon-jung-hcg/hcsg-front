import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import useStyles from '../../stylesheets/detailPost/styles';
import { DetailPost } from './DetailPostPage';

interface Iprops {
	post: DetailPost;
}

export default function DetailStackContainer(props: Iprops) {
	const { post } = props;
	const classes = useStyles();
	return (
		<section className={classes.stackContainer}>
			<Typography variant="h6" style={{ width: 100 }}>
				사용언어:{' '}
			</Typography>
			<Grid container className={classes.stackList}>
				{post.stacks.map((stack) => (
					<Grid item key={stack} className={classes.stackItem}>
						{stack}
					</Grid>
				))}
			</Grid>
		</section>
	);
}
