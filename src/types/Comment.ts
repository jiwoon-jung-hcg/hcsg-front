export interface Comment {
	id: number;
	commenter_id: number;
	commenter_nickname: string;
	content: string;
	created_at: string;
	updated_at: string | null;
}

export interface CreateCommentInfo {
	postId: number;
	content: string;
}

export interface UpdateCommentInfo {
	commentId: number;
	postId: number;
	content: string;
}
export interface DeleteCommentInfo {
	postId: number;
	commentId: number;
}
