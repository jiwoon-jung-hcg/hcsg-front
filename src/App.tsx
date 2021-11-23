import * as React from 'react';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/signin" element={<SignInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				{/* <Route path="/" element={<Home />} /> */}
			</Routes>
		</Router>
	);
};

export default App;
