export interface Comment {
	id: number;
	commenter_id: number; // 스네이크 케이스가 갑툭튀한 것 같아요. 다른 값들처럼 카멜 케이스로 바꿔보면 어떨까요?
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
