import type { IconNames } from "@app/ui";
import type { Task, User } from "./";

export interface List {
	id: string;
	icon: IconNames;
	title: string;
	description?: string;
	pendingTasks: Task[];
	completedTasks: Task[];
	users: User[];
}

export interface DbList {
	id: string;
	icon: IconNames;
	title: string;
	description?: string;
	tasks: Set<string>;
	users: Set<string>;
}
