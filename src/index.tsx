import React from 'react'; // 사용하지 않는 모듈은 지워주면 좋아요!
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/scss/index.scss';
import axios from 'axios';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootSaga, { RootReducer } from './modules';

axios.defaults.withCredentials = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root'),
);

// yarn.lock 파일도 있고, package-lock.json 파일도 있는데 yarn or npm 중 하나만 선택한다면 좋을 것 같아요!
