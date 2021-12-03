/** 스터디 모집 게시글 타입 */
export interface Post {
	id: number;
	title: string;
	stacks: string[];
	hit: number;
	commentsCount: number;
	likesCount: number;
}

export interface ResponseGetPosts {
	posts: Post[];
	last_page: boolean;
}

/** 정렬 타입 */
export type Sort = 'hit' | 'descending' | 'ascending';
