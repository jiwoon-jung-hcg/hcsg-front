import axios, { AxiosResponse } from 'axios';
import { Post, Sort } from '../../types/Home';

export async function getPosts(stacks: string[], offset = 1, sort: Sort = 'descending', limit = 6): Promise<Post[]> {
	const qsSort = `sort=${sort}`;
	const qsLimit = `&limit=${limit}`;
	const qsOffset = `&offset=${offset}`;
	const qsStacks = (() => {
		return stacks?.reduce((acc, cur) => {
			return (acc += `&stacks[]=${cur}`);
		}, '');
	})();
	console.log(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts?${qsSort + qsLimit + qsOffset + qsStacks}`);
	try {
		const response: AxiosResponse<Post[]> = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts?${qsSort + qsLimit + qsOffset + qsStacks}`,
		);
		return response.data;
	} catch (err: any) {
		throw new Error('invalid Request');
	}
	return [];
}
