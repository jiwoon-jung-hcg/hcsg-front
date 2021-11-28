import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	nav: {
		backgroundColor: '#fff',
		boxShadow: 'none',
	},
	title: {
		fontSize: 32,
		color: 'black',
		fontWeight: 'bold',
	},
	logo: {
		display: 'block',
		marginRight: '10px',
		width: '55px',
		height: 'auto',
	},
	icon: {
		marginRight: 20,
	},
	button: {
		marginTop: 40,
	},
	cardGrid: {
		padding: '20px 0',
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		boxShadow: '0 5px 25px rgb(0 0 0 / 15%)',
		borderRadius: '16px',
		cursor: 'pointer',
		transition: 'all 0.1s linear',
		'&:hover': {
			transform: 'scale(1.01)',
		},
	},
	cardMedia: {
		paddingTop: '56.25%',
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: '50px 0',
	},
}));

export default useStyles;
