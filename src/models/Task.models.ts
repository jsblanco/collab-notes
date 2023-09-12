import { DbImage } from './DbImage.models';

export interface Task {
	id: string;
	title: string;
	listId: string;
	description: string;
	history: TaskToggleEvent[];
	images: DbImage[];
	isCompleted?: boolean;
}

export interface TaskToggleEvent {
	userId: string;
	completed: boolean;
	timestamp: Date;
}