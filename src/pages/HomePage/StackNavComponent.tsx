import { Container, Grid, Typography } from '@material-ui/core';
import React, { RefObject } from 'react';
import stack from '../../utils/imageE';
import StackCompoenet from './StackCompoent';
import useStyles from '../../stylesheets/home/styles';

interface Iprops {
	stackRef: RefObject<HTMLDivElement>;
	updateStack: (stack: string) => void;
	feedbackFilter: () => void;
}

export default function StackNavComponent(props: Iprops) {
	const { stackRef, updateStack, feedbackFilter } = props;
	const classes = useStyles();
	return (
		<nav style={{ position: 'relative', zIndex: '10' }}>
			<Typography className={classes.stackHelpMessage}>
				아래의 이미지를 클릭해 원하는 언어로 필터링 해보세요!
			</Typography>
			<div className={classes.stackContainer}>
				<Grid container spacing={2} justifyContent="center" alignItems="center" ref={stackRef}>
					{stack.map((item) => (
						<StackCompoenet key={item.title} item={item} updateStack={updateStack} feedbackFilter={feedbackFilter} />
					))}
				</Grid>
			</div>
		</nav>
	);
}
