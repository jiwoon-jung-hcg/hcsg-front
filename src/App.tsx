import * as React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';
import { useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/LoadingComponent/Loading';
const SignInPage = loadable(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage/SignUpPage'));
const HomePage = loadable(() => import('./pages/HomePage/HomePage'));
const DetailPostPage = loadable(() => import('./pages/DetailPostPage/DetailPostPage'));
const GeneratePostPage = loadable(() => import('./pages/GeneratePostPage/GeneratePostPage'));
const AuthCheck = loadable(() => import('./hoc/authCheck'));

const App = () => {
	const element = useRoutes([
		{ path: '/', element: <AuthCheck SpecificComponent={HomePage} option={0} /> },
		{ path: '/signin', element: <AuthCheck SpecificComponent={SignInPage} option={-1} /> },
		{ path: '/signup', element: <AuthCheck SpecificComponent={SignUpPage} option={-1} /> },
		{
			path: '/post',
			children: [
				{ path: ':id', element: <AuthCheck SpecificComponent={DetailPostPage} option={0} /> },
				{ path: 'new', element: <AuthCheck SpecificComponent={GeneratePostPage} option={1} /> },
			],
		},
		{ path: '/loadingTest', element: <AuthCheck SpecificComponent={Loading} option={0} /> },
	]);
	return element;
};

export default App;
