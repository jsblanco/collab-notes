import {
	type DbList,
	type List,
	Periodicity,
	type Task,
	type TaskDto,
	type User,
} from "@app/models";
import type { DbImage } from "@app/models/DbImage.models";
import type { IconNames } from "@app/ui";
import type { ImagePickerAsset } from "expo-image-picker";
import { DummyLists, DummyTasks, DummyUsers } from "../../../data/DummyData";
import { fetchUserData } from "../auth/auth.queries";

export const fetchLists = (): List[] => {
	const preparedLists: List[] = [];

	DummyLists.forEach((list) => preparedLists.push(populateListData(list)));

	return preparedLists;
};

export const fetchList = (listId: string): List => {
	const list = DummyLists.get(listId);
	if (!list) throw new Error("No such list exists");

	return populateListData(list);
};

export const addList = (payload: {
	title: string;
	description?: string;
	icon: IconNames;
	users: User[];
	userId: string;
	id?: string;
}): List => {
	const { title, description, icon, users, userId, id } = payload;
	const originalList = id ? DummyLists.get(id) : null;
	if (id && !originalList) throw new Error("Could not find list to update");

	const list: DbList = {
		id: Date.now().toString(),
		tasks: new Set<string>(),
		...originalList,
		icon,
		title,
		description,
		users: new Set([userId, ...users.map((user) => user.id)]),
	};

	DummyLists.set(list.id, list);

	if (!originalList)
		addTaskToList(
			list.id,
			{
				images: [],
				history: [],
				listId: list.id,
				isCompleted: false,
				periodicity: Periodicity.MANUAL,
				title: `Add some tasks to "${list.title}"!`,
				description:
					"This list is empty. Start adding tasks to it to help you with your day to day! When you're done, delete me or update me for any task you like.",
			},
			userId,
		);

	return populateListData(list);
};

export const deleteList = (listId: string): void => {
	DummyLists.delete(listId);
};

const populateListData = (list: DbList): List => {
	const dbList = DummyLists.get(list.id);
	if (!dbList) throw Error("No such list exists");

	const tasks: Task[] = [];

	dbList.tasks.forEach((id) => {
		DummyTasks.map((task) => {
			if (task?.id === id) tasks.push(task);
		});
	});

	const completedTasks: Task[] = [];
	const pendingTasks: Task[] = [];

	tasks.forEach((task) => {
		if (!task.isCompleted) return pendingTasks.push(task);
		const now = new Date();
		switch (task.periodicity) {
			case Periodicity.DAILY:
				return now.getDate() === task.history[0].timestamp.getDate() &&
					now.getMonth() === task.history[0].timestamp.getMonth() &&
					now.getFullYear() === task.history[0].timestamp.getFullYear()
					? completedTasks.push(task)
					: automaticallyToggleAsPending(task, pendingTasks);
			case Periodicity.WEEKLY:
				return getWeekNumber(now) ===
					getWeekNumber(task.history[0].timestamp) &&
					now.getFullYear() === task.history[0].timestamp.getFullYear()
					? completedTasks.push(task)
					: automaticallyToggleAsPending(task, pendingTasks);
			case Periodicity.MONTHLY:
				return now.getMonth() === task.history[0].timestamp.getMonth() &&
					now.getFullYear() === task.history[0].timestamp.getFullYear()
					? completedTasks.push(task)
					: automaticallyToggleAsPending(task, pendingTasks);
			// case Periodicity.MANUAL:
			default:
				return completedTasks.push(task);
		}
	});

	dbList.tasks = new Set([
		...pendingTasks.map((task) => task.id),
		...completedTasks.map((task) => task.id),
	]);

	const users: User[] = [];

	dbList.users.forEach((id) => {
		DummyUsers.forEach((user) => {
			if (user?.id === id) users.push(fetchUserData(user.id));
		});
	});

	return {
		...list,
		completedTasks,
		pendingTasks,
		users,
	};
};

const automaticallyToggleAsPending = (task: Task, pendingTasks: Task[]) => {
	task.isCompleted = false;
	task.history.unshift({ completed: false, timestamp: new Date() });
	pendingTasks.push(task);
};

const getWeekNumber = (date: Date) => {
	const target = new Date(date.valueOf());
	const dayNr = (date.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNr + 3);
	const firstThursday = target.valueOf();
	target.setMonth(0, 1);
	if (target.getDay() !== 4)
		target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
	return 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
};

export const addTaskToList = (
	listId: string,
	task: TaskDto,
	userId: string,
): List => {
	const list = fetchList(listId);

	const history = [...task.history];
	if (task.id === "")
		history.unshift({
			userId,
			completed: !!task.isCompleted,
			timestamp: new Date(),
		});

	const dbTask = {
		...task,
		images: [...task.images],
		id: task.id ?? Date.now().toString(),
		history,
	};

	const dbList = DummyLists.get(listId);
	if (!dbList) throw new Error("List not found");

	dbList.tasks.add(dbTask.id);

	const oldTaskDbIndex = DummyTasks.findIndex(
		(dbTask) => dbTask.id === task.id,
	);
	if (oldTaskDbIndex >= 0) DummyTasks.splice(oldTaskDbIndex, 1);
	DummyTasks.push(dbTask);

	const listTaskArray = dbTask.isCompleted
		? list.completedTasks
		: list.pendingTasks;

	const oldTaskListIndex = listTaskArray.findIndex(
		(dbTask) => dbTask.id === task.id,
	);

	oldTaskListIndex < 0
		? listTaskArray.push(dbTask)
		: listTaskArray.splice(oldTaskListIndex, 1, dbTask);

	return list;
};

export const removeListTask = (listId: string, taskId: string): List => {
	const list = fetchList(listId);
	const tasks = [...list.completedTasks, ...list.pendingTasks];
	let taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1)
		throw new Error("Task does not belong to selected list");

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
	userId: string,
): List => {
	const list = fetchList(listId);

	const tasks = [...list.pendingTasks, ...list.completedTasks];
	let taskIndex = tasks.findIndex((task) => task.id === taskId);
	if (taskIndex === -1)
		throw new Error("Task does not belong to selected list");
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
		updatedtask,
	);
	taskIndex = DummyTasks.findIndex((task) => task.id === taskId);
	DummyTasks[taskIndex] = updatedtask;

	return list;
};

export const changeTaskOrder = (listId: string, taskOrder: string[]): List => {
	const list = fetchList(listId);
	const dbList = DummyLists.get(listId);
	if (!dbList || !list) throw new Error("List not found");

	const isCompleted = !!DummyTasks.find((task) => task.id === taskOrder[0])
		?.isCompleted;
	const newtasks = [];

	for (let i = 0; i < taskOrder.length; i++) {
		newtasks[i] = DummyTasks.find((task) => task.id === taskOrder[i]);
	}

	list[isCompleted ? "completedTasks" : "pendingTasks"] = newtasks as Task[];

	dbList.tasks = new Set([
		...list.pendingTasks.map((e) => e.id),
		...list.completedTasks.map((e) => e.id),
	]);

	return list;
};

export const uploadImage = (image: ImagePickerAsset): DbImage => {
	if (!image) throw Error("Could not upload your image");

	return {
		id: image.uri,
		preview: image.uri,
	};
};
