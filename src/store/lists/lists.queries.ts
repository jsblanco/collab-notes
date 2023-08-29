import { DummyLists, DummyTasks, DummyUsers } from '../../../data/DummyData';
import { DbList, List, Task, User } from '../../models';

export const fetchLists = (): List[] => {
	const preparedLists: List[] = [];

	DummyLists.forEach((list) => preparedLists.push(populateListData(list)));

	return preparedLists;
};

export const fetchList = (listId: string): List => {
	const list = DummyLists.find((list) => list.id === listId);
	if (!list) throw new Error('No such list exists');

	return populateListData(list);
};

const populateListData = (list: DbList): List => {
	const listIndex = DummyLists.findIndex((l) => l.id === list.id);
	if (listIndex === -1) throw Error('No such list exists');

	const tasks: Task[] = [];

	DummyLists[listIndex].tasks.map((id) => {
		DummyTasks.map((task) => {
			if (task?.id === id) tasks.push(task);
		});
	});
	const completedTasks = tasks.filter((task) => task.isCompleted);
	const pendingTasks = tasks.filter((task) => !task.isCompleted);

	DummyLists[listIndex].tasks = [
		...pendingTasks.map((task) => task.id),
		...completedTasks.map((task) => task.id),
	];

	const users: User[] = [];

	DummyLists[listIndex].users.map((id) => {
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

	const dbList = DummyLists.find((list) => list.id === listId);

	if (!dbList) throw new Error('List not found');

	dbList.tasks.push(dbTask.id);

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
	tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;

	const updatedtask = tasks[taskIndex];
	tasks.splice(taskIndex, 1);
	list.pendingTasks = tasks.filter((task) => !task.isCompleted);
	list.completedTasks = tasks.filter((task) => task.isCompleted);
	(updatedtask.isCompleted ? list.completedTasks : list.pendingTasks).push(
		updatedtask
	);

	const toggleDate = new Date();
	const latestToggle = updatedtask.history[0];
	if (
		userId === latestToggle.userId &&
		toggleDate.getTime() - new Date(latestToggle.timestamp).getTime() < 600000
	)
		updatedtask.history.shift();
	else
		updatedtask.history.unshift({
			userId,
			timestamp: toggleDate,
			completed: !!updatedtask.isCompleted,
		});

	taskIndex = DummyTasks.findIndex((task) => task.id === taskId);
	DummyTasks[taskIndex] = updatedtask;

	return list;
};

export const changeTaskOrder = (listId: string, taskOrder: string[]): List => {
	const list = fetchList(listId);
	const listIndex = DummyLists.findIndex((l) => l.id === listId);

	const isCompleted = !!DummyTasks.find((task) => task.id === taskOrder[0])
		?.isCompleted;
	const newtasks = [];

	for (let i = 0; i < taskOrder.length; i++) {
		newtasks[i] = DummyTasks.find((task) => task.id === taskOrder[i]);
	}

	isCompleted
		? (list.completedTasks = newtasks as Task[])
		: (list.pendingTasks = newtasks as Task[]);

	DummyLists[listIndex].tasks = [
		...list.pendingTasks.map((e) => e.id),
		...list.completedTasks.map((e) => e.id),
	];

	return list;
};
