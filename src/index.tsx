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

import App from './App';

import rootSaga, { RootReducer } from './modules';
import './styles/scss/index.scss';

axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<CookiesProvider>
				<App />
			</CookiesProvider>
		</Provider>
	</Router>,
	document.getElementById('root'),
);
