export interface GeneratePost {
	title: string;
	content: string;
	stacks: string[];
}

export interface UpdatePost extends GeneratePost {
	postId: number;
}
