import { Grid } from '@material-ui/core';
import useStyles from '../../styles/mui/home/styles';
import React, { useCallback } from 'react';
import '../../styles/scss/stack.scss';

export interface iProps {
	item: { title: string; url: string };
	updateStack: (item: string) => void;
	feedbackFilter: () => void;
}

export default function StackCompoent(props: iProps) {
	const classes = useStyles();
	const { item, updateStack, feedbackFilter } = props;

	const handleStackClick = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
		const classStyle = event.currentTarget.firstElementChild?.classList[1];
		const imageTarget = event.currentTarget.firstElementChild;
		imageTarget?.classList.add(classStyle === 'active-image' ? 'un-active-image' : 'active-image');
		imageTarget?.classList.remove(classStyle === 'active-image' ? 'active-image' : 'un-active-image');
		event.currentTarget.classList.toggle('box');
		updateStack(item.title);
		feedbackFilter();
	}, []);
	return (
		<Grid
			key={item.title}
			style={{ padding: '5px 5px', margin: '20px 10px', cursor: 'pointer' }}
			item
			onClick={handleStackClick}
		>
			<img src={item.url} alt={item.title} className="stack" />
		</Grid>
	);
}
