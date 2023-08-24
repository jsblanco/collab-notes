import { axiosInstance } from '../api/axios';
import { DummyTasks, DummyLists } from '../../../data/DummyData';
import { DbList, List } from '../../models/List.models';
import { Task } from '../../models/Task.models';

export const fetchLists = (): List[] => {
	const preparedLists: List[] = [];

	DummyLists.forEach((list) => preparedLists.push(populateListTasks(list)));

	return preparedLists;
};

export const fetchList = (listId: string): List => {
	const list = DummyLists.find((list) => list.id === listId);
	if (!list) throw new Error('No such list exists');

	return populateListTasks(list);
};

const populateListTasks = (list: DbList): List => {
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

	return {
		...list,
		completedTasks,
		pendingTasks,
	};
};

export const addTaskToList = (listId: string, task: Task): List => {
	const list = fetchList(listId);
	const dbTask = { ...task, id: new Date().getTime().toString() };
	const dbList = DummyLists.find((list) => list.id === listId);

	if (!dbList) throw new Error('List not found');

	dbList.tasks.push(dbTask.id);
	DummyTasks.push(dbTask);
	list.pendingTasks.push(dbTask);

	return list;
};

export const removeListTask = (listId: string, taskId: string): List => {
	const list = fetchList(listId);
	const tasks = [...list.completedTasks, ...list.pendingTasks];
	let taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1)
		throw new Error('Task does not belong to selected list');

	tasks.splice(taskIndex, 1);
	list.completedTasks = tasks.filter((task) => task.isCompleted);
	list.pendingTasks = tasks.filter((task) => !task.isCompleted);

	taskIndex = DummyTasks.findIndex((task) => task.id === taskId);
	DummyTasks.splice(taskIndex, 1);

	// if (!taskIndex) throw new Error('task not found');
	return list;
};

export const toggleTaskCompletion = (listId: string, taskId: string): List => {
	const list = fetchList(listId);

	const tasks = [...list.pendingTasks, ...list.completedTasks];
	let taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1)
		throw new Error('Task does not belong to selected list');
	tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;

	const updatedtask = tasks[taskIndex];
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
