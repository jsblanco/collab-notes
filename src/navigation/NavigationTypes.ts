import { Task } from '../models/Task/Task';

export enum ListStackRoutes {
	ListsHome = 'ListsHome',
	ListTasks = 'ListTasks',
	TaskForm = 'TaskForm',
	TaskDetails = 'TaskDetails',
}

export type ListStackProps = {
	[ListStackRoutes.ListsHome]: undefined;
	[ListStackRoutes.ListTasks]: {
		listId: string;
	};
	[ListStackRoutes.TaskForm]: {
		listId: string;
		task?: Task;
	};
	[ListStackRoutes.TaskDetails]: {
		listId: string;
		taskId: string;
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
	Home = 'Home',
}

export type DrawerProps = {
	[DrawerRoutes.List]: { listId: string };
	[DrawerRoutes.NewList]: {};
	[DrawerRoutes.Home]: {};
};
