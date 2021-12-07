import { useDispatch } from 'react-redux';
import { REFRESH_LIST } from '../modules/post';

export function refreshList() {
	useDispatch()({ type: REFRESH_LIST });
}
