import React, { useCallback } from 'react';
import stack from '../../utils/imageE';
import useStyles from '../../styles/mui/home/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SmsIcon from '@material-ui/icons/Sms';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Post } from '../../types/Home';
import { useNavigate } from 'react-router-dom';

interface Iprops {
	post: Post;
}

export default function PostComponent(props: Iprops) {
	const navigate = useNavigate();
	const classes = useStyles();
	const { post } = props;
	const handlePostClick = useCallback(() => navigate(`/post/${post.id}`), []);
	return (
		<Grid item key={post.id} xs={12} sm={6} md={4}>
			<Card className={classes.card} onClick={handlePostClick}>
				<CardContent className={classes.cardContent}>
					<Typography variant="h5" align="center" gutterBottom className={classes.cardTitle}>
						{post.title}
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
					<ul className={classes.iconCntainer}>
						<li style={{ display: 'flex', alignItems: 'center', marginRight: 10, color: '#888' }}>
							<VisibilityIcon style={{ marginRight: 5 }} />
							{post.hit || 0}
						</li>
						<li style={{ display: 'flex', alignItems: 'center', marginRight: 10, color: '#888' }}>
							<SmsIcon style={{ marginRight: 5 }} />
							{post.comments_count || 0}
						</li>
						<li style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
							<FavoriteIcon style={{ marginRight: 5, color: '#EE4343' }} />
							{post.likes_count || 0}
						</li>
					</ul>
				</CardContent>
			</Card>
		</Grid>
	);
}
