import axios from 'axios';
import { CreateCommentInfo, DeleteCommentInfo, UpdateCommentInfo } from '../../types/Comment';
import { headerConfig } from '../../utils/axiosHeader';

export async function createCommentRequest(commentInfo: CreateCommentInfo) {
	try {
		await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${commentInfo.postId}/comments`,
			{ content: commentInfo.content },
			headerConfig(),
		);
		return { successfullyCreated: true };
	} catch (error) {
		throw { successfullyCreated: false };
	}
}

export async function getCommentsRequest(post_id: number) {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${post_id}/comments`,
			headerConfig(),
		);
		return { comments: [...response.data] };
	} catch (error) {
		throw { comments: [] };
	}
}

export async function updateCommentRequest(commentInfo: UpdateCommentInfo) {
	try {
		await axios.put(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${commentInfo.postId}/comments/${commentInfo.commentId}`,
			{ content: commentInfo.content },
			headerConfig(),
		);
		return { successfullyUpdated: true };
	} catch (error) {
		throw { successfullyUpdated: false };
	}
}

export async function deleteCommentRequest(commentInfo: DeleteCommentInfo) {
	try {
		await axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${commentInfo.postId}/comments/${commentInfo.commentId}`,
			headerConfig(),
		);
		return { successfullyDeleted: true };
	} catch (error) {
		throw { successfullyDeleted: false };
	}
}
