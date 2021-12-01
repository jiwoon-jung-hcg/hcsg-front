import React from 'react';
import stack from '../../utils/imageE';
import useStyles from '../../stylesheets/home/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SmsIcon from '@material-ui/icons/Sms';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Post } from '../../types/Home';

interface Iprops {
	post: Post;
}

export default function PostComponent(props: Iprops) {
	const classes = useStyles();
	const { post } = props;
	return (
		<Grid item key={post.id} xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardContent className={classes.cardContent}>
					<Typography variant="h5" align="center" gutterBottom className={classes.cardTitle}>
						{post.title.slice(0, 15)}
					</Typography>
					<ul className={classes.postStack}>
						{post.stacks.slice(0, 3).map((keyword) => (
							<li key={keyword}>
								<img
									src={stack.find((stack) => stack.title === keyword)?.url}
									alt={keyword}
									className={classes.postStackImage}
								></img>
							</li>
						))}
					</ul>
					<ul
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							listStyle: 'none',
							margin: '25% 0 10% 0',
							padding: 0,
							// position: 'absolute',
						}}
					>
						<li style={{ display: 'flex', alignItems: 'center', marginRight: 10, color: '#888' }}>
							<VisibilityIcon style={{ marginRight: 5 }} />
							{post.hit}
						</li>
						<li style={{ display: 'flex', alignItems: 'center', marginRight: 10, color: '#888' }}>
							<SmsIcon style={{ marginRight: 5 }} />
							{0}
						</li>
						<li style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
							<FavoriteIcon style={{ marginRight: 5, color: '#EE4343' }} />
							{0}
						</li>
					</ul>
				</CardContent>
			</Card>
		</Grid>
	);
}
