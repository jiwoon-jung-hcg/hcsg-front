import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		background: 'white',
		marginBottom: '100px',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		// overflow: 'hidden',
		paddingTop: 100,
	},
	select: {
		width: '50%',
		marginTop: '20px',
	},
	chip: {
		fontSize: '1em',
		color: '#cccccc',
		cursor: 'pointer',
		padding: '0 10px',
		margin: '3px 3px',
		border: '1px solid #cccccc',
		borderRadius: '10px',
		transition: 'transform .1s',
		'&:hover': {
			transform: 'scale(1.1)',
		},
		'&:active': {
			transform: 'scale(1)',
		},
	},
	active: {
		transform: 'translateY(-15%)',
		backgroundColor: 'rgba(48, 63, 159, 0.5)',
		border: '1px solid rgba(48, 63, 159, 0.1)',
		color: 'white',
		boxShadow: '0px 8px 20px -5px rgba(48, 63, 159, .7)',
	},
}));

export default useStyles;
