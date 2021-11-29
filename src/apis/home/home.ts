import axios, { AxiosResponse } from 'axios';
import { Post } from '../../types/Home';

export async function getPosts(): Promise<Post[]> {
	try {
		const response: AxiosResponse<Post[]> = await axios.get('http://52.78.231.55:3003/api/v1/posts');
		return response.data;
	} catch (error) {
		console.log(error);
		throw new Error('Invalid request');
	}
}
