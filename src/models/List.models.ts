import { Ionicons } from '@expo/vector-icons';
import { Task, User } from './';

export interface List {
	id: string;
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	pendingTasks: Task[];
	completedTasks: Task[];
	users: User[];
}

export interface DbList {
	id: string;
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	tasks: string[];
	users: string[];
}
