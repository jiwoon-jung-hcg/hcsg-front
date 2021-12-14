import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { enableMapSet } from 'immer';
import loadable from '@loadable/component';

const SignInPage = loadable(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage/SignUpPage'));
const HomePage = loadable(() => import('./pages/HomePage/HomePage'));
const DetailPostPage = loadable(() => import('./pages/DetailPostPage/DetailPostPage'));
const GeneratePostPage = loadable(() => import('./pages/GeneratePostPage/GeneratePostPage'));
const UpdatePostPage = loadable(() => import('./pages/UpdatePostPage/UpdatePostPage'));
const UserProfilePage = loadable(() => import('./pages/UserProfilePage/UserProfilePage'));
const AuthCheck = loadable(() => import('./components/hoc/authCheck'));

enableMapSet();

const App = () => {
	const element = useRoutes([
		{ path: '/', element: <AuthCheck SpecificComponent={HomePage} option={0} /> },
		{
			path: '/user',
			children: [
				{ path: ':id', element: <AuthCheck SpecificComponent={UserProfilePage} option={1} /> },
				{ path: 'signin', element: <AuthCheck SpecificComponent={SignInPage} option={-1} /> },
				{ path: 'signup', element: <AuthCheck SpecificComponent={SignUpPage} option={-1} /> },
			],
		},
		{
			path: '/post',
			children: [
				{ path: ':id', element: <AuthCheck SpecificComponent={DetailPostPage} option={0} /> },
				{ path: 'new', element: <AuthCheck SpecificComponent={GeneratePostPage} option={1} /> },
				{ path: 'update', element: <AuthCheck SpecificComponent={UpdatePostPage} option={1} /> },
			],
		},
	]);
	return element;
};

export default App;
