import { Grid, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import useStyles from '../../styles/mui/generatePost/styles';

interface Iprops {
	value: string;
	onClick: (event: any) => void;
	stacks: string[];
}

export default function GridChipComponent(props: Iprops) {
	const classes = useStyles();
	const { value, onClick, stacks } = props;

	/** active 토글 및 상태변경 */
	const handleOnClick = useCallback(
		(event) => {
			event?.currentTarget.classList.toggle(classes.active);
			onClick(event?.currentTarget.textContent);
		},
		[stacks],
	);
	return (
		<Grid item>
			<Typography className={`${classes.chip}`} onClick={handleOnClick}>
				{value}
			</Typography>
		</Grid>
	);
}
