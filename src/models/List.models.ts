import { Ionicons } from '@expo/vector-icons';
import { Task, User } from './';
import { IconNames } from '@app/ui';

export interface List {
	id: string;
	icon: IconNames;
	title: string;
	pendingTasks: Task[];
	completedTasks: Task[];
	users: User[];
}

export interface DbList {
	id: string;
	icon: IconNames;
	title: string;
	tasks: Set<string>;
	users: Set<string>;
}
