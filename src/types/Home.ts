/** 스터디 모집 게시글 타입 */
export type Post = {
	id: number;
	title: string;
	content: string;
	hit: number;
	stacks: string[];
};

/** 정렬 타입 */
export type Sort = 'hit' | 'descending' | 'ascending';
