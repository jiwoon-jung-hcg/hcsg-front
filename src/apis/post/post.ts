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
	const qsLimit = `&limit=${limit * offset}`;
	const qsOffset = `&offset=${1}`;
	const qsStacks = (() => {
		return stacks?.reduce((acc, cur) => {
			return (acc += `&stacks[]=${cur}`);
		}, '');
	})();
	// 쿼리스트링이 많을 때 관련 라이브러리를 사용해보시는 것도 좋습니다. 코드로 쫌쫌따리 처리하는 것 보다 코드가 깔끔해질 수 있고 이에 따라 개발자의 피로도가 줄어듭니다
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
	} catch (err) {
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
		return { successfullyDeleted: true };
	} catch (error) {
		logger(error);
		throw { successfullyDeleted: false };
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
			throw { liked: false };
		}
	} catch (error) {
		logger(error);
		throw error;
	}
}
