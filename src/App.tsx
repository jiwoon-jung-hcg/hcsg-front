import * as React from 'react';
import loadable from '@loadable/component';
import { useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import authCheck from './hoc/authCheck';
const SignInPage = loadable(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage/SignUpPage'));
const HomePage = loadable(() => import('./pages/HomePage/HomePage'));
const DetailPostPage = loadable(() => import('./pages/DetailPostPage/DetailPostPage'));
const GeneratePostPage = loadable(() => import('./pages/GeneratePostPage/GeneratePostPage'));

const App = () => {
	const element = useRoutes([
		{ path: '/', element: React.createElement(authCheck(HomePage, 0), null) },
		{ path: '/signin', element: React.createElement(authCheck(SignInPage, -1), null) },
		{ path: '/signup', element: React.createElement(authCheck(SignUpPage, -1), null) },
		{
			path: '/post',
			children: [{ path: ':id', element: React.createElement(authCheck(DetailPostPage, 1), null) }],
		},
		{ path: '/post/new', element: React.createElement(authCheck(GeneratePostPage, 1), null) },
	]);
	return element;
};

export default App;
