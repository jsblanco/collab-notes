import { Task } from './Task.models';
import { Ionicons } from '@expo/vector-icons';

export interface List {
	id: string;
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	pendingTasks: Task[];
	completedTasks: Task[];
}

export interface DbList {
	id: string;
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	tasks: string[];
}
