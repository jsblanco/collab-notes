import { Task } from '../Task/Task';

export interface List {
	id: string;
	icon: string;
	title: string;
	pendingTasks: Task[];
	completedTasks: Task[];
}

export interface DbList {
	id: string;
	icon: string;
	title: string;
	tasks: string[];
}
