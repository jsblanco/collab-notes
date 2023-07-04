import { axiosInstance } from '../api/axios';
import { DummyEntries, DummyLists } from '../../../data/DummyData';
import { DbList, List } from '../../models/List/List';
import { Entry } from '../../models/Entry/Entry';

export const fetchLists = (): List[] => {
	const preparedLists: List[] = [];

	DummyLists.forEach((list: DbList) =>
		preparedLists.push(populateListEntries(list))
	);

	return preparedLists;
};

export const fetchList = (listId: string): List => {
	const list = DummyLists.find((list) => list.id === listId);
	if (!list) throw new Error('No such list exists');

	return populateListEntries(list);
};

const populateListEntries = (list: DbList): List => {
	const entries: Entry[] = [];

	list.entries.map((id) => {
		DummyEntries.map((entry) => {
			if (entry?.id === id) entries.push(entry);
		});
	});

	return {
		...list,
		completedEntries: entries.filter((entry) => entry.isCompleted),
		pendingEntries: entries.filter((entry) => !entry.isCompleted),
	};
};

export const addEntryToList = (listId: string, entry: Entry): List => {
	const list = fetchList(listId);
	const dbEntry = { ...entry, id: new Date().getTime().toString() };
	DummyEntries.push(dbEntry);
	list.pendingEntries.push(dbEntry);

	return list;
};

export const removeListEntry = (listId: string, entryId: string): List => {
	const list = fetchList(listId);
	const entries = [...list.completedEntries, ...list.pendingEntries];
	let entryIndex = entries.findIndex((entry) => entry.id === entryId);
	if (entryIndex === -1)
		throw new Error('Task does not belong to selected list');

	entries.splice(entryIndex, 1);
	list.completedEntries = entries.filter((entry) => entry.isCompleted);
	list.pendingEntries = entries.filter((entry) => !entry.isCompleted);

	entryIndex = DummyEntries.findIndex((entry) => entry.id === entryId);
	DummyEntries.splice(entryIndex, 1);

	// if (!entryIndex) throw new Error('Entry not found');
	return list;
};

export const toggleEntryCompletion = (
	listId: string,
	entryId: string
): List => {
	const list = fetchList(listId);

	const entries = [...list.completedEntries, ...list.pendingEntries];
	let entryIndex = entries.findIndex((entry) => entry.id === entryId);
	if (entryIndex === -1)
		throw new Error('Task does not belong to selected list');
	entries[entryIndex].isCompleted = !entries[entryIndex].isCompleted;

	const updatedEntry = entries[entryIndex];
	entries.splice(entryIndex, 1);
	list.pendingEntries = entries.filter((entry) => !entry.isCompleted);
	list.completedEntries = entries.filter((entry) => entry.isCompleted);
	(updatedEntry.isCompleted ? list.completedEntries : list.pendingEntries).push(
		updatedEntry
	);

	entryIndex = DummyEntries.findIndex((entry) => entry.id === entryId);
	DummyEntries[entryIndex] = updatedEntry;
	console.log(list);
	return list;
};

export const changeEntryOrder = (
	listId: string,
	entryOrder: string[]
): List => {
	const list = fetchList(listId);

	const isCompleted = DummyEntries.find((entry) => entry.id === entryOrder[0]);
	const newEntries = [];

	for (let i = 0; i < entryOrder.length; i++) {
		newEntries[i] = DummyEntries.find((entry) => entry.id === entryOrder[i]);
	}


isCompleted
	? list.completedEntries = newEntries as Entry[]
	: list.pendingEntries = newEntries as Entry[];


	return list;
};
