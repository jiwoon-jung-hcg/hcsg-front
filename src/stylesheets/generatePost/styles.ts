import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
	container: {},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100vh',
		overflow: 'hidden',
	},
	select: {
		width: '50%',
		marginTop: '20px',
	},
}));

export default useStyles;
