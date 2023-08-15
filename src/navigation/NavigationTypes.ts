import { Task } from '../models/Task/Task';

export enum ListStackRoutes {
	ListHome = 'ListsHome',
	ListTasks = 'ListTasks',
	TaskForm = 'TaskForm',
}

export type ListStackProps = {
	[ListStackRoutes.ListHome]: undefined;
	[ListStackRoutes.ListTasks]: {
		listId: string;
	};
	[ListStackRoutes.TaskForm]: {
		listId: string;
		task?: Task;
	};
};

export enum AuthStackRoutes {
	AuthsHome = 'AuthsHome',
	Startup = 'Startup',
}

export type AuthStackProps = {
	[AuthStackRoutes.AuthsHome]: undefined;
	[AuthStackRoutes.Startup]: {};
};

export enum DrawerRoutes {
	NewList = 'New Lists',
	List = 'List',
}

export type DrawerProps = {
	[DrawerRoutes.List]: { listId: string };
	[DrawerRoutes.NewList]: {};
};
