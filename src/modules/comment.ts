import { call, put, takeLatest } from '@redux-saga/core/effects';
import produce from 'immer';
import {
	createCommentRequest,
	deleteCommentRequest,
	getCommentsRequest,
	updateCommentRequest,
} from '../apis/comment/comment';
import { Comment, CreateCommentInfo, DeleteCommentInfo, UpdateCommentInfo } from '../types/Comment';
import ErrorResponse from '../types/Error';
import { UpdatePostResponse } from './post';
import { Action } from './user';

//============================================================//
/** Type */
//============================================================//
export interface CommentInitialState {
	comments: Comment[];
	successfullyCreated: boolean;
	successfullyUpdated: boolean;
	successfullyDeleted: boolean;
	changed: boolean;
}
export interface CreateCommentResponse {
	successfullyCreated: boolean;
}
export interface GetCommentsResponse {
	comments: Comment[];
}
export interface UpdateCommentResponse {
	successfullyUpdated: boolean;
}
export interface DeleteCommentResponse {
	successfullyDeleted: boolean;
}

//============================================================//
/** Initial state */
//============================================================//
export const commentInitialState: CommentInitialState = {
	comments: [],
	successfullyCreated: false,
	successfullyUpdated: false,
	successfullyDeleted: false,
	changed: false,
};

//============================================================//
/** Action Type */
//============================================================//
export const REFRESH_COMMENT = 'comment/REFRESH_COMMENT';
export const NEW_COMMENT_REQUEST = 'comment/NEW_COMMENT_REQUEST';
export const NEW_COMMENT_SUCCESS = 'comment/NEW_COMMENT_SUCCESS';
export const NEW_COMMENT_FAILURE = 'comment/NEW_COMMENT_FAILURE';
export const GET_COMMENTS_REQUEST = 'comment/GET_COMMENT_REQUEST';
export const GET_COMMENTS_SUCCESS = 'comment/GET_COMMENT_SUCCESS';
export const GET_COMMENTS_FAILURE = 'comment/GET_COMMENT_FAILURE';
export const UPDATE_COMMENT_REQUEST = 'comment/UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'comment/UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'comment/UPDATE_COMMENT_FAILURE';
export const DELETE_COMMENT_REQUEST = 'comment/DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'comment/DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'comment/DELETE_COMMENT_FAILURE';
export const REFRESH_CREATE_COMMENT_CHECK = 'comment/REFRESH_CREATE_COMMENT_CHECK';
export const REFRESH_UPDATE_COMMENT_CHECK = 'comment/REFRESH_UPDATE_COMMENT_CHECK';
export const REFRESH_DELETE_COMMENT_CHECK = 'comment/REFRESH_DELETE_COMMENT_CHECK';

//============================================================//
/** 0️⃣ Create Action Function */
//============================================================//
export const createComentAction = (commentInfo: CreateCommentInfo) => ({
	type: NEW_COMMENT_REQUEST,
	payload: { ...commentInfo },
});
export const getCommentsAction = (postId: number) => ({ type: GET_COMMENTS_REQUEST, payload: { postId } });
export const updateCommentAction = (commentInfo: UpdateCommentInfo) => ({
	type: UPDATE_COMMENT_REQUEST,
	payload: { ...commentInfo },
});
export const deleteCommentAction = (commentInfo: DeleteCommentInfo) => ({
	type: DELETE_COMMENT_REQUEST,
	payload: { ...commentInfo },
});

//============================================================//
/** 2️⃣ Saga function */
//============================================================//
export function* createCommentSaga(action: Action) {
	try {
		const response: CreateCommentResponse = yield call(createCommentRequest, { ...action.payload });
		yield put({ type: NEW_COMMENT_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: NEW_COMMENT_FAILURE, payload: { ...(error as ErrorResponse<CreateCommentResponse>).error } });
	}
}
export function* getCommentsSaga(action: Action) {
	try {
		const response: GetCommentsResponse = yield call(getCommentsRequest, action.payload.postId);
		yield put({ type: GET_COMMENTS_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: GET_COMMENTS_FAILURE, payload: { ...(error as ErrorResponse<GetCommentsResponse>).error } });
	}
}
export function* updateCommentSaga(action: Action) {
	try {
		const response: UpdateCommentResponse = yield call(updateCommentRequest, { ...action.payload });
		yield put({ type: UPDATE_COMMENT_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: UPDATE_COMMENT_FAILURE, payload: { ...(error as ErrorResponse<UpdatePostResponse>).error } });
	}
}
export function* deleteCommentSaga(action: Action) {
	try {
		const response: DeleteCommentResponse = yield call(deleteCommentRequest, { ...action.payload });
		yield put({ type: DELETE_COMMENT_SUCCESS, payload: { ...response } });
	} catch (error) {
		yield put({ type: DELETE_COMMENT_FAILURE, payload: { ...(error as ErrorResponse<DeleteCommentResponse>).error } });
	}
}

//============================================================//
/** 1️⃣ Take */
//============================================================//
export function* watchComment() {
	yield takeLatest(NEW_COMMENT_REQUEST, createCommentSaga);
	yield takeLatest(GET_COMMENTS_REQUEST, getCommentsSaga);
	yield takeLatest(UPDATE_COMMENT_REQUEST, updateCommentSaga);
	yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentSaga);
}

//============================================================//
/** 3️⃣ Reducer */
//============================================================//
export default function commentReducers(state = commentInitialState, action: Action) {
	switch (action.type) {
		case GET_COMMENTS_SUCCESS:
			return produce(state, (draftState) => {
				draftState.comments = [...action.payload.comments];
			});
		case GET_COMMENTS_FAILURE:
			return produce(state, (draftState) => {
				draftState.comments = [];
			});
		case NEW_COMMENT_SUCCESS:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = true;
				draftState.changed = !draftState.changed;
			});
		case NEW_COMMENT_FAILURE:
			return produce(state, (draftState) => {
				draftState.successfullyCreated = false;
			});
		case UPDATE_COMMENT_SUCCESS:
			return produce(state, (draftState) => {
				draftState.successfullyUpdated = true;
				draftState.changed = !draftState.changed;
			});
		case UPDATE_COMMENT_FAILURE:
			return produce(state, (draftState) => {
				draftState.successfullyUpdated = false;
			});
		case DELETE_COMMENT_SUCCESS:
			return produce(state, (draftState) => {
				draftState.successfullyDeleted = true;
				draftState.changed = !draftState.changed;
			});
		case DELETE_COMMENT_FAILURE:
			return produce(state, (draftState) => {
				draftState.successfullyDeleted = false;
				draftState.changed = !draftState.changed;
			});
		case REFRESH_COMMENT:
			return produce(state, (draftState) => {
				draftState.comments = [];
				draftState.successfullyCreated = false;
				draftState.successfullyDeleted = false;
				draftState.successfullyUpdated = false;
			});
		default:
			return state;
	}
}
