export interface Task {
	id: string;
	title: string;
	listId: string;
	description: string;
	history: TaskToggleEvent[];
	isCompleted?: boolean;
}

export interface TaskToggleEvent {
	userId: string;
	completed: boolean;
	timestamp: Date;
}
