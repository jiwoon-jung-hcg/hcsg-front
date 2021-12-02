import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		backgroundColor: '#fff',
	},
	main: {
		padding: '24px 0',
	},
	back: {
		color: 'gray',
		fontSize: '52px',
		fontWeight: 'bold',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.1)',
			color: '#b25769',
		},
	},
	title: {
		marginTop: '40px',
		fontWeight: 'bold',
	},
	subtitle: {
		margin: '30px 0',
		'& h5': {
			fontWeight: 'bold',
		},
	},
	profile: {
		display: 'flex',
		alignItems: 'center',
	},
	profileImage: {
		transform: 'scale(1.4)',
		margin: '0 20px 0 8px',
	},
	date: {
		fontWeight: 'lighter',
		color: '#8c8c8c',
	},
	stackContainer: {
		display: 'flex',
		alignItems: 'center',
		borderBottom: '2px solid #dce2f0',
	},
	stackList: {
		listStyle: 'none',
		padding: 0,
		display: 'flex',
		alignItems: 'center',
	},
	stackItem: {
		fontSize: '18px',
		margin: '0 5px',
		padding: '5px 10px',
		backgroundColor: '#dce2f0',
		borderRadius: '12px',
	},
	content: {
		margin: '40px 0',
	},
	count: {
		display: 'flex',
		alignItems: 'center',
		margin: '20px 10px',
		'& svg': {
			color: '#999999',
			fontSize: '32px',
		},
		'& span': {
			color: '#0f0f0f',
			fontSize: '20px',
			marginLeft: '3px',
		},
	},
	commentCount: {
		letterSpacing: '0',
		fontWeight: 900,
	},
	commentBox: {
		marginBottom: '50px',
	},
	commentContainer: {
		padding: '24px 0',
		borderBottom: '1px solid #dce2f0',
	},
	commentHeader: {
		display: 'flex',
		alignItems: 'center',
		'& img': {
			transform: 'scale(1.2)',
		},
		'& div': {
			marginLeft: '10px',
			'& h5': {
				fontSize: '1.5em',
				fontWeight: 'bold',
			},
			'& h6': {
				fontSize: '1em',
				color: '#999999',
			},
		},
	},
	commentContent: {
		marginTop: '20px',
		fontSize: ' 1.8em',
		fontWeight: 'normal',
	},
}));

export default useStyles;
