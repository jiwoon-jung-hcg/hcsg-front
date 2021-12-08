import axios, { AxiosResponse } from 'axios';
import { GetNewPostsResponse, GetPostsPayload } from '../../modules/post';
import { Post, ResponseGetPosts } from '../../types/Home';
import { GeneratePost, UpdatePost } from '../../types/Post';
import { headerConfig } from '../../utils/axiosHeader';
import { logger } from '../../utils/logger';

/** Get Lists */
export async function getPostsRequest(postInfo: GetPostsPayload): Promise<ResponseGetPosts> {
	const { sort, limit, offset, stacks } = postInfo;
	const qsSort = `sort=${sort}`;
	const qsLimit = `&limit=${limit}`;
	const qsOffset = `&offset=${offset}`;
	const qsStacks = (() => {
		return stacks?.reduce((acc, cur) => {
			return (acc += `&stacks[]=${cur}`);
		}, '');
	})();
	try {
		const response: AxiosResponse<ResponseGetPosts> = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts?${qsSort + qsLimit + qsOffset + qsStacks}`,
			headerConfig(),
		);
		const postResponseData = response.data;
		if (postResponseData.posts.length) {
			return postResponseData;
		} else {
			throw new Error('No Posts');
		}
	} catch (err) {
		logger(err);
		throw { posts: [], last_page: true };
	}
}

/** Get List only one ~ */
export async function getDetailPostRequest(postId: number): Promise<Post> {
	try {
		const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${postId}`, headerConfig());
		const postResponseData = response.data;
		return postResponseData;
	} catch (err: any) {
		logger(err);
		throw null;
	}
}

/** Generator Post */
export async function createPostRequest(postInfo: GeneratePost): Promise<GetNewPostsResponse> {
	try {
		const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts`, postInfo, headerConfig());
		return { successfullyCreated: true, postId: response.data.id };
	} catch (error) {
		logger(error);
		throw { successfullyCreated: false, postId: null };
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
		throw { successfullyUpdated: false, postId: null };
	}
}

/** Delete Post */
export async function deletePostRequest(postId: number) {
	try {
		const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${postId}`, headerConfig());
		console.log(response.data);
		return { successfullyDeleted: true };
	} catch (error) {
		logger(error);
		throw { successfullyDeleted: false };
	}
}
