import React, { RefObject } from 'react';
import { DetailPost } from './DetailPostPage';
import useStyles from '../../stylesheets/detailPost/styles';

interface Iprops {
	post: DetailPost;
	content: RefObject<HTMLElement>;
}

export default function DetailContent(props: Iprops) {
	const classes = useStyles();
	const { post, content } = props;
	return (
		<section className={classes.content} ref={content} dangerouslySetInnerHTML={{ __html: post.content }}></section>
	);
}
