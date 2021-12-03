import { Post } from '../types/Home';
import { ADD_POST, AddPostAction } from '../actions/postAction';

const initialState: Post[] = [];

const postReducer = (prevState = initialState, action: AddPostAction): Post[] => {
	switch (action.type) {
		case ADD_POST:
			return [...prevState, action.data];
		default:
			return prevState;
	}
};

export default postReducer;
