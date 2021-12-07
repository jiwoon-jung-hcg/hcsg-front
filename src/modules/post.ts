import { call, put, takeLatest } from '@redux-saga/core/effects';
import { GeneratePost } from '../types/Post';
import { Post } from '../types/Home';
import { Action } from './user';
import { createPostRequest, getDetailPostRequest, getPostsRequest } from '../apis/home/home';
import produce from 'immer';
import { DetailPost } from '../pages/DetailPostPage/DetailPostPage';

//============================================================//
/** Type */
//============================================================//
export interface PostInitialState {
	posts: Post[];
	selectedPost: DetailPost | null;
	lastPage: boolean;
	successfullyCreated: boolean;
	successfullyUpdated: boolean;
	successfullyDeleted: boolean;
}
export interface GetPostsPayload {
	sort: string;
	limit: number;
	offset: number;
	stacks: string[];
}
export interface GetPostsResponse {
	posts: Post[];
	last_page: boolean;
}
export interface GetNewPostsResponse {
	successfullyCreate: boolean;
}
export interface CustomError extends Error {
	successfullyCreate: boolean;
}

//============================================================//
/** Initial state */
//============================================================//
export const postInitialState: PostInitialState = {
	posts: [],
	selectedPost: null,
	lastPage: false,
	successfullyCreated: false,
	successfullyUpdated: false,
	successfullyDeleted: false,
};

//============================================================//
/** Action Type */
//============================================================//
export const NEW_POST_REQUEST = 'post/NEW_POST_REQUEST';
export const NEW_POST_SUCCESS = 'post/NEW_POST_SUCCESS';
export const NEW_POST_FAILURE = 'post/NEW_POST_FAILURE';
export const GET_POSTS_REQUEST = 'post/GET_POST_REQUEST';
export const GET_POSTS_SUCCESS = 'post/GET_POST_SUCCESS';
export const GET_POSTS_FAILURE = 'post/GET_POST_FAILURE';
export const UPDATE_POST_REQUEST = 'post/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'post/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'post/UPDATE_POST_FAILURE';
export const DELETE_POST_REQUEST = 'post/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'post/DELETE_POST_FAILURE';
export const GET_DETAIL_POST_REQUEST = 'post/GET_DETAIL_POST_REQUEST';
export const GET_DETAIL_POST_SUCCESS = 'post/GET_DETAIL_POST_SUCCESS';
export const GET_DETAIL_POST_FAILURE = 'post/GET_DETAIL_POST_FAILURE';
export const GET_FILTER_POSTS_REQUEST = 'post/GET_FILTER_POSTS_REQUEST';
export const GET_FILTER_POSTS_SUCCESS = 'post/GET_FILTER_POSTS_SUCCESS';
export const GET_FILTER_POSTS_FAILURE = 'post/GET_FILTER_POSTS_FAILURE';
export const REFRESH_LIST = 'post/REFRESH_LIST';
export const REFRESH_CREATE_POST_CHECK = 'post/REFRESH_CREATE_POST_CHECK';
export const REFRESH_UPDATE_POST_CHECK = 'post/REFRESH_UPDATE_POST_CHECK';
export const REFRESH_DELETE_POST_CHECK = 'post/REFRESH_DELETE_POST_CHECK';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const getPosts = (postInfo: GetPostsPayload) => ({ type: GET_POSTS_REQUEST, payload: { ...postInfo } });
export const getFilterPosts = (postInfo: GetPostsPayload) => ({
	type: GET_FILTER_POSTS_REQUEST,
	payload: { ...postInfo },
});
export const getDetailPost = (postId?: string) => ({
	type: GET_DETAIL_POST_REQUEST,
	payload: { postId: postId && parseInt(postId) },
});
export const newPost = (postInfo: GeneratePost) => ({ type: NEW_POST_REQUEST, payload: { ...postInfo } });

//============================================================//
/** 2️⃣ Saga function */
//============================================================//
export function* getPostsSaga(action: Action) {
	try {
		const response: GetPostsResponse = yield call(getPostsRequest, { ...action.payload });
		yield put({ type: GET_POSTS_SUCCESS, payload: { ...response } });
	} catch (error: any) {
		yield put({ type: GET_POSTS_FAILURE, payload: { ...error } });
	}
}
export function* getFilterPostsSaga(action: Action) {
	try {
		const response: GetPostsResponse = yield call(getPostsRequest, { ...action.payload });
		yield put({ type: GET_FILTER_POSTS_SUCCESS, payload: { ...response } });
	} catch (error: any) {
		yield put({ type: GET_FILTER_POSTS_FAILURE, payload: { ...error } });
	}
}
export function* getDetailPostSaga(action: Action) {
	try {
		const response: DetailPost = yield call(getDetailPostRequest, action.payload.postId);
		yield put({ type: GET_DETAIL_POST_SUCCESS, payload: { ...response } });
	} catch (error: any) {
		yield put({ type: GET_DETAIL_POST_FAILURE });
	}
}
export function* newPostSaga(action: Action) {
	try {
		const response: GetNewPostsResponse = yield call(createPostRequest, { ...action.payload });
		yield put({ type: NEW_POST_SUCCESS, payload: { ...response } });
	} catch (err) {
		const error: CustomError = err as CustomError;
		yield put({ type: NEW_POST_FAILURE, payload: { ...error } });
	}
}

//============================================================//
/** 1️⃣ Take */
//============================================================//
export function* watchPost() {
	yield takeLatest(GET_POSTS_REQUEST, getPostsSaga);
	yield takeLatest(GET_FILTER_POSTS_REQUEST, getFilterPostsSaga);
	yield takeLatest(GET_DETAIL_POST_REQUEST, getDetailPostSaga);
	yield takeLatest(NEW_POST_REQUEST, newPostSaga);
	// yield takeLatest(UPDATE_POST_REQUEST, null);
	// yield takeLatest(DELETE_POST_REQUEST, null);
}

//============================================================//
/** 3️⃣ Reducer */
//============================================================//
export default function postReducers(state = postInitialState, action: Action) {
	switch (action.type) {
		case GET_POSTS_SUCCESS:
			return produce(state, (draftState) => {
				draftState.posts.push(...action.payload.posts);
				draftState.lastPage = action.payload.last_page;
			});
		case GET_POSTS_FAILURE:
			return produce(state, (draftState) => {
				draftState.posts = [];
				draftState.lastPage = true;
			});
		case GET_FILTER_POSTS_SUCCESS:
			return produce(state, (draftState) => {
				draftState.posts = [...action.payload.posts];
				draftState.lastPage = action.payload.last_page;
			});
		case GET_FILTER_POSTS_FAILURE:
			return produce(state, (draftState) => {
				draftState.posts = [];
				draftState.lastPage = true;
			});
		case GET_DETAIL_POST_SUCCESS:
			return produce(state, (draftState) => {
				draftState.selectedPost = { ...action.payload };
			});
		case GET_DETAIL_POST_FAILURE:
			return produce(state, (draftState) => {
				draftState.selectedPost = null;
			});
		case REFRESH_LIST:
			return produce(state, (draftState) => {
				draftState.posts = [];
			});
		case REFRESH_CREATE_POST_CHECK:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = false;
			});
		default:
			return state;
	}
}
