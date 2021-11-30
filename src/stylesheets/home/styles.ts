import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	navRoot: {
		flexGrow: 1,
	},
	nav: {
		backgroundColor: '#fff',
		boxShadow: 'none',
	},
	title: {
		fontSize: 28,
		color: 'black',
		fontWeight: 'bold',
		flexGrow: 1,
	},
	menu: {
		fontSize: 24,
		color: '#595959',
		fontWeight: 'bold',
	},
	logo: {
		display: 'flex',
		alignItems: 'center',
		marginRight: '10px',
		width: '55px',
		height: 'auto',
	},
	stack: {
		width: 65,
		// height: 65,
		cursor: 'pointer',
		transition: 'transform 0.1s linear',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
	icon: {
		marginRight: 20,
	},
	postStack: {
		padding: 0,
		listStyle: 'none',
		display: 'flex',
		justifyContent: 'center',
	},
	mainTItle: {
		fontSize: 62,
		fontWeight: 'bold',
		color: '#212121',
	},
	postStackImage: {
		width: 55,
		margin: '0px 5px',
	},
	button: {
		marginTop: 40,
	},
	stackContainer: {
		marginTop: 8,
		boxShadow: '0 0 15px rgb(0 0 0 / 15%)',
	},
	cardGrid: {
		padding: '20px 0',
	},
	card: {
		height: '100%',
		display: 'flex',
		padding: '12.5% 0',
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0 5px 25px rgb(0 0 0 / 15%)',
		borderRadius: '16px',
		cursor: 'pointer',
		transition: 'all 0.1s linear',
		'&:hover': {
			transform: 'scale(1.01)',
		},
	},
	cardTitle: {
		fontSize: 22,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	cardMedia: {
		paddingTop: '56.25%',
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: '50px 0',
	},
	loadingContainer: {
		textAlign: 'center',
		margin: '50px 0',
	},
}));

export default useStyles;
