import axios, { AxiosResponse } from 'axios';
import { GetPostsPayload } from '../../modules/post';
import { Post, ResponseGetPosts, Sort } from '../../types/Home';
import { logger } from '../../utils/logger';
import { headerConfig } from '../user/user';

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
	} catch (err: any) {
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
