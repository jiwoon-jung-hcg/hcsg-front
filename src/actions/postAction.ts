import { Post } from '../types/Home';

export const ADD_POST = 'ADD_POST';

export interface AddPostAction {
	type: typeof ADD_POST;
	data: Post;
}

export const addPost = (data: Post): AddPostAction => {
	return {
		type: ADD_POST,
		data,
	};
};
