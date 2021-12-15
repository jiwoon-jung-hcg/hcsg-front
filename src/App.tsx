import * as React from 'react';
// react 17 버전 이후로는 해당 import 안해오셔도 괜찮습니다!
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
// 이렇게 코드 스플리팅 할수 있군요! 좋은 것 같습니다!
// 궁금한게 있는데 CRA인 경우도 잘 적용되는 건가요?

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
