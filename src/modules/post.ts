import { call, put, takeLatest, takeEvery } from '@redux-saga/core/effects';
import { GeneratePost, UpdatePost } from '../types/Post';
import { Post } from '../types/Home';
import { Action } from './user';
import {
	createPostRequest,
	deletePostRequest,
	getDetailPostRequest,
	getPostsRequest,
	likePostRequest,
	updatePostRequest,
} from '../apis/post/post';
import produce from 'immer';
import { DetailPost } from '../pages/DetailPostPage/DetailPostPage';
import ErrorResponse from '../types/Error';
import logger from 'redux-logger';

//============================================================//
/** Type */
//============================================================//
export interface PostInitialState {
	posts: Post[];
	selectedPost: DetailPost | null;
	lastPage: boolean;
	id: number | null; // PostId
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
	postId: number;
	successfullyCreated: boolean;
}
export interface UpdatePostResponse {
	postId: number;
	successfullyUpdated: boolean;
}
export interface DeleteResponse {
	successfullyDeleted: boolean;
}
export interface LikePostResponse {
	liked: boolean;
}

//============================================================//
/** Initial state */
//============================================================//
export const postInitialState: PostInitialState = {
	posts: [],
	selectedPost: null,
	lastPage: false,
	id: null,
	successfullyCreated: false,
	successfullyUpdated: false,
	successfullyDeleted: false,
};

//============================================================//
/** Action Type */
//============================================================//
export const REFRESH_LIST = 'post/REFRESH_LIST';
export const LIKE_REQUEST = 'post/LIKE_REQUEST';
export const LIKE_ACTIVE = 'post/LIKE_ACTIVE';
export const LIKE_INACTIVE = 'post/LIKE_INACTIVE';
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
export const REFRESH_CREATE_POST_CHECK = 'post/REFRESH_CREATE_POST_CHECK';
export const REFRESH_UPDATE_POST_CHECK = 'post/REFRESH_UPDATE_POST_CHECK';
export const REFRESH_DELETE_POST_CHECK = 'post/REFRESH_DELETE_POST_CHECK';
export const REFRESH_DETAIL_POST = 'post/REFRESH_DETAIL_POST';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const getPosts = (postInfo: GetPostsPayload) => ({
	type: GET_POSTS_REQUEST,
	payload: { ...postInfo },
});
export const getFilterPosts = (postInfo: GetPostsPayload) => ({
	type: GET_FILTER_POSTS_REQUEST,
	payload: { ...postInfo },
});
export const getDetailPost = (postId?: string) => ({
	type: GET_DETAIL_POST_REQUEST,
	payload: { postId: postId && parseInt(postId) },
});
export const newPost = (postInfo: GeneratePost) => ({
	type: NEW_POST_REQUEST,
	payload: { ...postInfo },
});
export const updatePost = (postInfo: UpdatePost) => ({
	type: UPDATE_POST_REQUEST,
	payload: { ...postInfo },
});
export const deletePost = (postId: number) => ({
	type: DELETE_POST_REQUEST,
	payload: { postId },
});
export const likePostAction = (postId: number) => ({ type: LIKE_REQUEST, payload: { postId } });

//============================================================//
/** 2️⃣ Saga function */
//============================================================//
export function* getPostsSaga(action: Action) {
	try {
		const response: GetPostsResponse = yield call(getPostsRequest, {
			...action.payload,
		});
		yield put({ type: GET_POSTS_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: GET_POSTS_FAILURE, payload: { ...(error as ErrorResponse<GetPostsResponse>).error } });
	}
}
export function* getFilterPostsSaga(action: Action) {
	try {
		const response: GetPostsResponse = yield call(getPostsRequest, {
			...action.payload,
		});
		yield put({ type: GET_FILTER_POSTS_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: GET_FILTER_POSTS_FAILURE, payload: { ...(error as ErrorResponse<GetPostsResponse>).error } });
	}
}
// ! 수정
export function* getDetailPostSaga(action: Action) {
	try {
		const response: DetailPost = yield call(getDetailPostRequest, action.payload.postId);
		yield put({ type: GET_DETAIL_POST_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: GET_DETAIL_POST_FAILURE, payload: { ...(error as { error: { selected: null } }).error } });
	}
}
export function* newPostSaga(action: Action) {
	try {
		const response: GetNewPostsResponse = yield call(createPostRequest, {
			...action.payload,
		});
		yield put({ type: NEW_POST_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: NEW_POST_FAILURE, payload: { ...(error as ErrorResponse<GetNewPostsResponse>).error } });
	}
}
export function* updatePostSaga(action: Action) {
	try {
		const response: UpdatePostResponse = yield call(updatePostRequest, {
			...action.payload,
		});
		yield put({ type: UPDATE_POST_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: UPDATE_POST_FAILURE, payload: { ...(error as ErrorResponse<UpdatePostResponse>).error } });
	}
}
export function* deletePostSaga(action: Action) {
	try {
		const response: DeleteResponse = yield call(deletePostRequest, action.payload.postId);
		yield put({ type: DELETE_POST_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: DELETE_POST_FAILURE, payload: { ...(error as ErrorResponse<DeleteResponse>).error } });
	}
}
export function* likePostSaga(action: Action) {
	try {
		const response: LikePostResponse = yield call(likePostRequest, action.payload.postId);
		yield put({ type: LIKE_ACTIVE, payload: { ...response } });
	} catch (error) {
		yield put({ type: LIKE_INACTIVE, payload: { ...(error as ErrorResponse<LikePostResponse>).error } });
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
	yield takeLatest(UPDATE_POST_REQUEST, updatePostSaga);
	yield takeLatest(DELETE_POST_REQUEST, deletePostSaga);
	yield takeEvery(LIKE_REQUEST, likePostSaga);
}

//============================================================//
/** 3️⃣ Reducer */
//============================================================//
export default function postReducers(state = postInitialState, action: Action) {
	switch (action.type) {
		case GET_POSTS_SUCCESS:
			return produce(state, (draftState) => {
				draftState.posts = [...action.payload.posts];
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
		case NEW_POST_SUCCESS:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = true;
				draftState.id = action.payload.postId;
			});
		case NEW_POST_FAILURE:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = false;
				draftState.id = null;
			});
		case UPDATE_POST_SUCCESS:
			return produce(state, (draftState) => {
				draftState.successfullyUpdated = true;
				draftState.id = action.payload.postId;
			});
		case UPDATE_POST_FAILURE:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = false;
				draftState.id = null;
			});
		case DELETE_POST_SUCCESS:
			return produce(state, (draftState) => {
				draftState.successfullyDeleted = true;
			});
		case DELETE_POST_FAILURE:
			return produce(state, (draftState) => {
				draftState.successfullyDeleted = false;
			});
		case REFRESH_LIST:
			return produce(state, (draftState) => {
				draftState.posts = [];
			});
		case REFRESH_CREATE_POST_CHECK:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = false;
			});
		case REFRESH_UPDATE_POST_CHECK:
			return produce(state, (draftState) => {
				draftState.successfullyUpdated = false;
			});
		case REFRESH_DELETE_POST_CHECK:
			return produce(state, (draftState) => {
				draftState.successfullyDeleted = false;
				draftState.id = null;
			});
		case REFRESH_DETAIL_POST:
			return produce(state, (draftState) => {
				draftState.selectedPost = null;
				draftState.successfullyDeleted = false;
			});
		case LIKE_ACTIVE:
			return produce(state, (draftState) => {
				draftState.selectedPost!.liked = true;
				draftState.selectedPost!.likesCount++;
			});
		case LIKE_INACTIVE:
			return produce(state, (draftState) => {
				draftState.selectedPost!.liked = false;
				draftState.selectedPost!.likesCount--;
			});
		default:
			return state;
	}
}
