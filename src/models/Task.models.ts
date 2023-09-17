import { DbImage } from './DbImage.models';

export interface Task extends TaskDto {
	id: string;
}

export interface TaskToggleEvent {
	userId?: string;
	completed: boolean;
	timestamp: Date;
}

export interface TaskDto {
	id?: string;
	title: string;
	listId: string;
	images: DbImage[];
	description: string;
	isCompleted?: boolean;
	periodicity: Periodicity;
	history: TaskToggleEvent[];
}

export enum Periodicity {
	MANUAL = '-1',
	DAILY = '1',
	WEEKLY = '7',
	MONTHLY = '30',
}
