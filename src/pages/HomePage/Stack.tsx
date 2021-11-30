import { Grid } from '@material-ui/core';
import useStyles from '../../stylesheets/home/styles';
import React, { useCallback } from 'react';

export interface iProps {
	item: { title: string; url: string };
	updateStack: (item: string) => void;
}

export default function Stack(props: iProps) {
	const classes = useStyles();
	const { item, updateStack } = props;

	const handleStackClick = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
		event.currentTarget.classList.toggle('.selected');
		updateStack(item.title);
	}, []);
	return (
		<Grid key={item.title} item>
			<img src={item.url} alt={item.title} className={classes.stack} onClick={handleStackClick} />
		</Grid>
	);
}
