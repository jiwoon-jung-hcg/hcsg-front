import { createStore, compose, applyMiddleware } from 'redux';
import Reducer from './_reducers/index';

const initialState = {
	user: {
		isAuth: false,
		loginSuccess: false,
		data: null,
	},
	posts: [],
};

const store = createStore(Reducer, initialState);

export default store;
