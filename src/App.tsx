import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { enableMapSet } from 'immer';
import loadable from '@loadable/component';

import { USER, GUEST, EVERY_ONE } from './components/hoc/authCheck';
import Loading from './components/LoadingComponent/Loading';

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
		{ path: '/', element: <AuthCheck SpecificComponent={HomePage} option={EVERY_ONE} /> },
		{
			path: '/user',
			children: [
				{ path: ':id', element: <AuthCheck SpecificComponent={UserProfilePage} option={USER} /> },
				{ path: 'signin', element: <AuthCheck SpecificComponent={SignInPage} option={GUEST} /> },
				{ path: 'signup', element: <AuthCheck SpecificComponent={SignUpPage} option={GUEST} /> },
			],
		},
		{
			path: '/post',
			children: [
				{ path: ':id', element: <AuthCheck SpecificComponent={DetailPostPage} option={EVERY_ONE} /> },
				{ path: 'new', element: <AuthCheck SpecificComponent={GeneratePostPage} option={USER} /> },
				{ path: 'update', element: <AuthCheck SpecificComponent={UpdatePostPage} option={USER} /> },
			],
		},
	]);
	return element;
};

export default App;
