import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		backgroundColor: 'white',
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
		position: 'relative',
		fontSize: 28,
		color: 'black',
		fontWeight: 'bold',
		flexGrow: 1,
		zIndex: -1,
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
	icon: {
		marginRight: 20,
	},
	postStack: {
		padding: 0,
		margin: '30px 0',
		listStyle: 'none',
		display: 'flex',
		justifyContent: 'center',
	},
	iconCntainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		listStyle: 'none',
		margin: '30px 0',
		padding: 0,
	},
	mainTItle: {
		fontSize: 62,
		fontWeight: 'bold',
		color: '#212121',
	},
	postStackImage: {
		width: 35,
		margin: '0px 5px',
	},
	button: {
		marginTop: 40,
	},
	stackContainer: {
		marginTop: 8,
		boxShadow: '0 0 15px rgb(0 0 0 / 15%)',
		backgroundColor: theme.palette.background.paper,
	},
	cardGrid: {
		padding: '20px 0',
		backgroundColor: 'white',
	},
	card: {
		height: '100%',
		display: 'flex',
		padding: '12.5% 0 0 0',
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
	cardContent: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		flexGrow: 1,
		padding: '0 15px 0 15px',
	},
	cardTitle: {
		fontSize: 20,
		width: '100%',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		margin: 0,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: '50px 0',
	},
	loadingContainer: {
		textAlign: 'center',
		margin: '50px 0',
	},
	stackHelpMessage: {
		fontSize: '20px',
		fontWeight: 'bold',
		textAlign: 'center',
		color: theme.palette.background.paper,
		backgroundColor: '#ffe579',
		zIndex: -1,
		borderTopLeftRadius: '90%',
		borderTopRightRadius: '90%',
		padding: '5px 25px',
		boxShadow: '0px -9px 34px 4px rgba(0,0,0,0.1)',
		webkitBoxShadow: '0px -9px 34px 4px rgba(0,0,0,0.1)',
	},
}));

export default useStyles;
