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
import { enableMapSet } from 'immer';
enableMapSet();

const App = () => {
	const element = useRoutes([
		// 아래 컴포넌트에 전달하는 props중 option은 string type으로 만들어놓으면 이해하기 편할 것 같아요 !
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
