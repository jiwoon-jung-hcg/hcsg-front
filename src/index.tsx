import React from 'react';
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

// 궁금한것이 있습니다
// 1. yarn 했을 때 왜 저는 yarn.lock 에 있는 패키지들과 버전이 조금씩 달라질까요?
// 2. 인덴트를 띄어쓰기가 아니라 탭을 사용하시나요? 