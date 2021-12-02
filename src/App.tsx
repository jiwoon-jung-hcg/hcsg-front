import * as React from 'react';
import loadable from '@loadable/component';
import { Routes, Route } from 'react-router-dom';
import GeneratePostPage from './pages/GeneratePostPage/GeneratePostPage';
import TextEditorComponent from './components/TextEditorComponent/TextEditorComponent';
const SignInPage = loadable(() => import('./pages/SignInPage/SignInPage'));
const SignUpPage = loadable(() => import('./pages/SignUpPage/SignUpPage'));
const HomePage = loadable(() => import('./pages/HomePage/HomePage'));

const App = () => {
	return (
		<Routes>
			<Route path="/signin" element={<SignInPage />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/create-post" element={<GeneratePostPage />} />
			<Route path="/" element={<HomePage />} />
		</Routes>
	);
};

export default App;
