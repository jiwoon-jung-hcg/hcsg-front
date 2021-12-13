import * as React from 'react';
import loadable from '@loadable/component';
import { useRoutes } from 'react-router-dom';
import Loading from './components/LoadingComponent/Loading';
const SignInPage = loadable(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage/SignUpPage'));
const HomePage = loadable(() => import('./pages/HomePage/HomePage'));
const DetailPostPage = loadable(() => import('./pages/DetailPostPage/DetailPostPage'));
const GeneratePostPage = loadable(() => import('./pages/GeneratePostPage/GeneratePostPage'));
const UpdatePostPage = loadable(() => import('./pages/UpdatePostPage/UpdatePostPage'));
const AuthCheck = loadable(() => import('./components/hoc/authCheck'));
import { enableMapSet } from 'immer'; // import와 const 코드가 섞여있어 어지러우니 import 코드끼리 모아두는것이 어떨까요? 적절한 줄바꿈도 함께...! 
enableMapSet();

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
				{ path: 'update', element: <AuthCheck SpecificComponent={UpdatePostPage} option={1} /> },
			],
		},
	]);
	return element;
};

export default App;
