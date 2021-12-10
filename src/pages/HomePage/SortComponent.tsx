import { Grid, Typography } from '@material-ui/core';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import useStyles from '../../styles/mui/home/styles';
import React from 'react';

export default function SortComponent() {
	const classes = useStyles();
	return (
		<Grid container justifyContent="space-between" style={{ padding: '10px 10px 0' }}>
			<Grid item>
				<Grid container direction="row" spacing={4}>
					<Grid item>
						<Typography variant="h5" className={classes.filterIcon}>
							<FiberNewIcon fontSize="large" /> 최신
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h5" className={classes.filterIcon}>
							<WhatshotIcon fontSize="large" /> 인기
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
