import { call, put, takeLatest } from '@redux-saga/core/effects';
import { GeneratePost } from '../types/Post';
import { Post } from '../types/Home';
import { Action } from './user';
import { getPostsRequest } from '../apis/home/home';
import produce from 'immer';

//============================================================//
/** Type */
//============================================================//
export interface PostInitialState {
	posts: Post[];
	seletedPost: Post | null;
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

//============================================================//
/** Initial state */
//============================================================//
export const postInitialState: PostInitialState = {
	posts: [],
	seletedPost: null,
	lastPage: false,
	successfullyCreated: false,
	successfullyUpdated: false,
	successfullyDeleted: false,
};

//============================================================//
/** Action Type */
//============================================================//
export const GET_POSTS_REQUEST = 'post/GET_POST_REQUEST';
export const GET_POSTS_SUCCESS = 'post/GET_POST_SUCCESS';
export const GET_POSTS_FAILURE = 'post/GET_POST_FAILURE';
export const GET_FILTER_POSTS_REQUEST = 'post/GET_FILTER_POSTS_REQUEST';
export const GET_FILTER_POSTS_SUCCESS = 'post/GET_FILTER_POSTS_SUCCESS';
export const GET_FILTER_POSTS_FAILURE = 'post/GET_FILTER_POSTS_FAILURE';

export const GET_DETAIL_POST_REQUEST = 'post/GET_DETAIL_POST_REQUEST';
export const GET_DETAIL_POST_SUCCESS = 'post/GET_DETAIL_POST_SUCCESS';
export const GET_DETAIL_POST_FAILURE = 'post/GET_DETAIL_POST_FAILURE';

export const NEW_POST_REQUEST = 'post/NEW_POST_REQUEST';
export const NEW_POST_SUCCESS = 'post/NEW_POST_SUCCESS';
export const NEW_POST_FAILURE = 'post/NEW_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'post/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'post/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'post/UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'post/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'post/DELETE_POST_FAILURE';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const getPosts = (postInfo: GetPostsPayload) => ({ type: GET_POSTS_REQUEST, payload: { ...postInfo } });
export const getFilterPosts = (postInfo: GetPostsPayload) => ({
	type: GET_FILTER_POSTS_REQUEST,
	payload: { ...postInfo },
});
export const getDetailPost = (postId: number) => ({ type: GET_DETAIL_POST_REQUEST, payload: { postId } });
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
	// const response = yield
}
export function* newPostSaga(action: Action) {
	yield console.log('aa');
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
export default function postReducers(state = postInitialState, action: Action<GetPostsResponse>) {
	switch (action.type) {
		case GET_POSTS_SUCCESS:
			return produce(state, (draftState) => {
				draftState.posts.push(...action.payload.posts);
				draftState.lastPage = action.payload.last_page;
			});
		case GET_FILTER_POSTS_SUCCESS:
			return produce(state, (draftState) => {
				draftState.posts = [...action.payload.posts];
				draftState.lastPage = action.payload.last_page;
			});
		default:
			return state;
	}
}
