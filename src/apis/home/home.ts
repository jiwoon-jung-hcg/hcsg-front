import axios, { AxiosResponse } from 'axios';
import { Post, ResponseGetPosts, Sort } from '../../types/Home';
import { logger } from '../../utils/logger';

export async function getPosts(
	stacks: string[],
	offset = 1,
	sort: Sort = 'descending',
	limit = 6,
): Promise<ResponseGetPosts> {
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
		);
		return response.data;
	} catch (err: any) {
		logger(err);
		throw new Error('invalid Request');
	}
}
