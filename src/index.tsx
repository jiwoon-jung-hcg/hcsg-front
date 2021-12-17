import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CookiesProvider } from 'react-cookie';
import logger from 'redux-logger';
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import App from './App';

import rootSaga, { RootReducer } from './modules';
import './styles/scss/index.scss';

axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);

const themeLight = createMuiTheme({
	palette: {
		background: {
			default: '#fff',
		},
	},
});

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<CookiesProvider>
				<MuiThemeProvider theme={themeLight}>
					<App />
				</MuiThemeProvider>
			</CookiesProvider>
		</Provider>
	</Router>,
	document.getElementById('root'),
);
