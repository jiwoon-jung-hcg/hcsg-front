import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';

const Reducer = combineReducers({
	user: userReducer,
	post: postReducer,
});

export default Reducer;
