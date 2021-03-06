import React, { useCallback } from 'react';
import clsx from 'clsx';

import { Grid, Typography } from '@material-ui/core';

import useStyles from '../../styles/mui/generatePost/styles';

interface Iprops {
	value: string;
	onClick: (chip: string) => void;
	stacks: string[];
}

export default function GridChipComponent(props: Iprops) {
	const classes = useStyles();
	const { value, onClick, stacks } = props;

	/** active 토글 및 상태변경 */
	const handleOnClick = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event?.currentTarget.classList.toggle(classes.active);
			onClick(event.currentTarget.textContent as string);
		},
		[stacks],
	);
	return (
		<Grid item>
			<Typography
				className={clsx(classes.chip, stacks.find((el) => el === value.toLowerCase()) && classes.active)}
				onClick={handleOnClick}
			>
				{value}
			</Typography>
		</Grid>
	);
}
