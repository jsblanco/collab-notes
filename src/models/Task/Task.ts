export interface Task {
	id: string;
	title: string;
	listId: string;
	description: string;
	isCompleted?: boolean;
}
