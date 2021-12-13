import { Grid, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
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
				className={classes.chip + ' ' + (stacks.find((el) => el === value.toLowerCase()) && classes.active)}
				// className에 조건에 따라 값을 주고 싶을때는 clsx 라이브러리를 활용해보세요. 조건과 조건에 따른 값을 깔끔하게 볼 수 있어 좋답니다. 
				onClick={handleOnClick}
			>
				{value}
			</Typography>
		</Grid>
	);
}
