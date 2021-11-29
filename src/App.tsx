import * as React from 'react';
import loadable from '@loadable/component';
import { Routes, Route } from 'react-router-dom';
const SignInPage = loadable(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage/SignUpPage'));
const Home = loadable(() => import('./pages/HomePage/Home'));

const App = () => {
	return (
		<Routes>
			<Route path="/signin" element={<SignInPage />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/" element={<Home />} />
		</Routes>
	);
};

export default App;
