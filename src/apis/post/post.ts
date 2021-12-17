import axios, { AxiosResponse } from 'axios';
import qs from 'query-string';
import camelcaseKeys from 'camelcase-keys';

import { GetNewPostsResponse, GetPostsPayload } from '../../modules/post';
import { DetailPost } from '../../pages/DetailPostPage/DetailPostPage';

import { Post, ResponseGetPosts } from '../../types/Home';
import { GeneratePost, UpdatePost } from '../../types/Post';

import { headerConfig } from '../../utils/axiosHeader';
import { logger } from '../../utils/logger';

/** Get Lists */
export async function getPostsRequest(postInfo: GetPostsPayload): Promise<ResponseGetPosts> {
	const query = qs.stringify(postInfo, { arrayFormat: 'bracket' });
	try {
		const response: AxiosResponse<ResponseGetPosts> = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts?${query}`,
			headerConfig(),
		);
		const postResponseData = response.data;
		if (postResponseData.posts.length) {
			return postResponseData;
		} else {
			throw new Error('No Posts');
		}
	} catch (error) {
		logger(error);
		throw { error: { posts: [], last_page: true } };
	}
}

/** Get List only one ~ */
export async function getDetailPostRequest(postId: number): Promise<Post> {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${postId}`, headerConfig());
		const postResponseData = camelcaseKeys(response.data);
		return postResponseData;
	} catch (error) {
		logger(error);
		throw { error: { selectedPost: null } };
	}
}

/** Generator Post */
export async function createPostRequest(postInfo: GeneratePost): Promise<GetNewPostsResponse> {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts`, postInfo, headerConfig());
		return { successfullyCreated: true, postId: response.data.id };
	} catch (error) {
		logger(error);
		throw { error: { successfullyCreated: false, postId: null } };
	}
}

/** Update Post */
export async function updatePostRequest(postInfo: UpdatePost) {
	const { title, content, stacks } = postInfo;
	try {
		const response = await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${postInfo.postId}`,
			{ title, content, stacks },
			headerConfig(),
		);
		return { successfullyUpdated: true, postId: response.data.id };
	} catch (error) {
		logger(error);
		throw { error: { successfullyUpdated: false, postId: null } };
	}
}

/** Delete Post */
export async function deletePostRequest(postId: number) {
	try {
		const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${postId}`, headerConfig());
		return { successfullyDeleted: true };
	} catch (error) {
		logger(error);
		throw { error: { successfullyDeleted: false } };
	}
}

export async function likePostRequest(postId: number) {
	try {
		const response: AxiosResponse = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${postId}/likes`,
			null,
			headerConfig(),
		);
		if (response.status === 201) {
			return { liked: true };
		} else {
			throw { error: { liked: false } };
		}
	} catch (error) {
		logger(error);
		throw error;
	}
}
