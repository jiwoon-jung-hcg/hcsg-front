import { Typography, Grid } from '@material-ui/core';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import useStyles from '../../styles/mui/home/styles';
import React, { useCallback, useRef } from 'react';

interface Iprops {
	handleChangeSort: (event: React.MouseEvent<HTMLHeadingElement>) => void;
}

export default function SortComponent(props: Iprops) {
	const { handleChangeSort } = props;
	const recent = useRef<HTMLHeadingElement>(null);
	const hot = useRef<HTMLHeadingElement>(null);
	const handleClick = useCallback((event: React.MouseEvent<HTMLHeadingElement>) => {
		const content: string | undefined = event.currentTarget.textContent?.trim();
		if (recent.current && hot.current) {
			if (content === '최신') {
				recent.current.classList.add(classes.activeFilter);
				hot.current.classList.remove(classes.activeFilter);
			} else {
				hot.current.classList.add(classes.activeFilter);
				recent.current.classList.remove(classes.activeFilter);
			}
		}
		handleChangeSort(event);
	}, []);
	const classes = useStyles();
	return (
		<Grid container justifyContent="space-between" style={{ padding: '10px 10px 0' }}>
			<Grid item>
				<Grid container direction="row" spacing={4}>
					<Grid item>
						<Typography
							variant="h5"
							className={`${classes.filterIcon} ${classes.activeFilter}`}
							onClick={handleClick}
							ref={recent}
						>
							<FiberNewIcon fontSize="large" /> 최신
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h5" className={classes.filterIcon} onClick={handleClick} ref={hot}>
							<WhatshotIcon fontSize="large" /> 인기
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
