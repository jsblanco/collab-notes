export enum ListStackRoutes {
	ListsHome = "Overview",
	ListTasks = "List Tasks",
	EditList = "Edit List",
	TaskForm = "Task Form",
	TaskDetails = "Task Details",
}

export type ListStackProps = {
	[ListStackRoutes.ListsHome]: undefined;
	[ListStackRoutes.EditList]: {
		listId?: string;
	};
	[ListStackRoutes.ListTasks]: {
		listId: string;
	};
	[ListStackRoutes.TaskForm]: {
		listId: string;
		listTitle: string;
		taskId?: string;
	};
	[ListStackRoutes.TaskDetails]: {
		listId: string;
		taskId: string;
	};
};
