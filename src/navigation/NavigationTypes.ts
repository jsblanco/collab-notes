import { Task } from '../models/Task.models';

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
		taskId?: string;
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

export type DrawerListEntry = `[Drawer] List #${string}`;

export const getDrawerListLink = (listId: string): DrawerListEntry =>
	`[Drawer] List #${listId}`;

export enum DrawerRoutes {
	NewList = '[Drawer] New Lists',
	List = '[Drawer] List',
	Home = '[Drawer] Home',
}

export type DrawerProps = {
	[DrawerRoutes.NewList]: {};
	[DrawerRoutes.Home]: {};
	[T: DrawerListEntry]: {
		screen: ListStackRoutes;
		params: { listId: string };
	};
};
