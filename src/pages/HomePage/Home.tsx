import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

export default function Home() {
	const classes = useStyles();

	return (
		<Container>
			<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
				<Grid item xs={8} justifyContent="flex-start">
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
				<Grid item xs={2}>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
				<Grid item xs={2}>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}
