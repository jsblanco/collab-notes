import { DbImage } from './DbImage.models';

export interface Task extends TaskDto {
	id: string;
}

export interface TaskToggleEvent {
	userId: string;
	completed: boolean;
	timestamp: Date;
}

export interface TaskDto {
	id?: string;
	title: string;
	listId: string;
	description: string;
	history: TaskToggleEvent[];
	images: DbImage[];
	isCompleted?: boolean;
}
