import { Grid } from '@material-ui/core';
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
		<nav>
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
