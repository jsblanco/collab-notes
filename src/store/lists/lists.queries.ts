import { DbList, List, Task, User } from '@app/models';
import { IconNames } from '@app/ui';
import { DummyLists, DummyTasks, DummyUsers } from '../../../data/DummyData';

export const fetchLists = (): List[] => {
	const preparedLists: List[] = [];

	DummyLists.forEach((list) => preparedLists.push(populateListData(list)));

	return preparedLists;
};

export const fetchList = (listId: string): List => {
	const list = DummyLists.get(listId);
	if (!list) throw new Error('No such list exists');

	return populateListData(list);
};

export const addList = (payload: {
	title: string;
	icon: IconNames;
	users: string[];
	userId: string;
	listId?: string;
}): List => {
	const { title, icon, users, userId, listId } = payload;
	const originalList = listId ? DummyLists.get(listId) : {};
	if (listId && !originalList) throw new Error('Could not find list to update');

	const list: DbList = {
		id: new Date().getTime().toString(),
		tasks: new Set<string>(),
		...originalList,
		title,
		icon,
		users: new Set([userId, ...users]),
	};

	DummyLists.set(list.id, list);

	return populateListData(list);
};

const populateListData = (list: DbList): List => {
	const dbList = DummyLists.get(list.id);
	if (!dbList) throw Error('No such list exists');

	const tasks: Task[] = [];

	dbList.tasks.forEach((id) => {
		DummyTasks.map((task) => {
			if (task?.id === id) tasks.push(task);
		});
	});
	const completedTasks = tasks.filter((task) => task.isCompleted);
	const pendingTasks = tasks.filter((task) => !task.isCompleted);

	dbList.tasks = new Set([
		...pendingTasks.map((task) => task.id),
		...completedTasks.map((task) => task.id),
	]);

	const users: User[] = [];

	dbList.users.forEach((id) => {
		DummyUsers.forEach((user) => {
			if (user?.id === id) users.push(user);
		});
	});

	return {
		...list,
		completedTasks,
		pendingTasks,
		users,
	};
};

export const addTaskToList = (
	listId: string,
	task: Task,
	userId: string
): List => {
	const list = fetchList(listId);
	const dbTask = {
		...task,
		id: task.id ?? new Date().getTime().toString(),
		history: [
			{
				userId,
				completed: !!task.isCompleted,
				timestamp: new Date(),
			},
			...task.history,
		],
	};

	const dbList = DummyLists.get(listId);
	if (!dbList) throw new Error('List not found');

	dbList.tasks.add(dbTask.id);

	const oldTaskDbIndex = DummyTasks.findIndex((dbTask) => dbTask.id === task.id);
	if (oldTaskDbIndex >= 0) DummyTasks.splice(oldTaskDbIndex, 1);
	DummyTasks.push(dbTask);

	const listTaskArray = dbTask.isCompleted
		? list.completedTasks
		: list.pendingTasks;

	const oldTaskListIndex = listTaskArray.findIndex(
		(dbTask) => dbTask.id === task.id
	);
	if (oldTaskListIndex >= 0) listTaskArray.splice(oldTaskListIndex, 1);

	listTaskArray.push(dbTask);

	return list;
};

export const removeListTask = (listId: string, taskId: string): List => {
	const list = fetchList(listId);
	const tasks = [...list.completedTasks, ...list.pendingTasks];
	let taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1) throw new Error('Task does not belong to selected list');

	tasks.splice(taskIndex, 1);
	list.completedTasks = tasks.filter((task) => task.isCompleted);
	list.pendingTasks = tasks.filter((task) => !task.isCompleted);

	taskIndex = DummyTasks.findIndex((task) => task.id === taskId);
	DummyTasks.splice(taskIndex, 1);

	// if (!taskIndex) throw new Error('task not found');
	return list;
};

export const toggleTaskCompletion = (
	listId: string,
	taskId: string,
	userId: string
): List => {
	const list = fetchList(listId);

	const tasks = [...list.pendingTasks, ...list.completedTasks];
	let taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1) throw new Error('Task does not belong to selected list');
	const toggleDate = new Date();

	const updatedtask = {
		...tasks[taskIndex],
		isCompleted: !tasks[taskIndex].isCompleted,
		history:
			userId === tasks[taskIndex].history[0].userId &&
			toggleDate.getTime() - tasks[taskIndex].history[0].timestamp.getTime() <
				600000
				? tasks[taskIndex].history.slice(1)
				: [
						{
							userId,
							timestamp: toggleDate,
							completed: !tasks[taskIndex].isCompleted,
						},
						...tasks[taskIndex].history,
				  ],
	};

	tasks.splice(taskIndex, 1);
	list.pendingTasks = tasks.filter((task) => !task.isCompleted);
	list.completedTasks = tasks.filter((task) => task.isCompleted);
	(updatedtask.isCompleted ? list.completedTasks : list.pendingTasks).push(
		updatedtask
	);
	taskIndex = DummyTasks.findIndex((task) => task.id === taskId);
	DummyTasks[taskIndex] = updatedtask;

	return list;
};

export const changeTaskOrder = (listId: string, taskOrder: string[]): List => {
	const list = fetchList(listId);
	const dbList = DummyLists.get(listId);
	if (!dbList || !list) throw new Error('List not found');

	const isCompleted = !!DummyTasks.find((task) => task.id === taskOrder[0])
		?.isCompleted;
	const newtasks = [];

	for (let i = 0; i < taskOrder.length; i++) {
		newtasks[i] = DummyTasks.find((task) => task.id === taskOrder[i]);
	}

	isCompleted
		? (list.completedTasks = newtasks as Task[])
		: (list.pendingTasks = newtasks as Task[]);

	dbList.tasks = new Set([
		...list.pendingTasks.map((e) => e.id),
		...list.completedTasks.map((e) => e.id),
	]);

	return list;
};
