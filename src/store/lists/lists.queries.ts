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

const populateListEntries = (list: DbList) => {
	const entries: Entry[] = [];

	list.entries.map((id) => {
		DummyEntries.map((entry) => {
			if (entry?.id === id) entries.push(entry);
		});
	});

	return {
		...list,
		entries,
	};
};

export const addEntryToList = (listId: string, entry: Entry): List => {
	const list = fetchList(listId);
	const dbEntry = { ...entry, id: new Date().getTime().toString() };
	DummyEntries.push(dbEntry);
	list.entries.push(dbEntry);

	return list;
};

export const removeListEntry = (listId: string, entryId: string): List => {
	const list = fetchList(listId);
	let entryIndex = list.entries.findIndex((entry) => entry.id === entryId);
	if (entryIndex === -1)
		throw new Error('Task does not belong to selected list');
	list.entries.splice(entryIndex, 1);

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
	let entryIndex = list.entries.findIndex((entry) => entry.id === entryId);
	if (entryIndex === -1)
		throw new Error('Task does not belong to selected list');
	list.entries[entryIndex].isCompleted = !list.entries[entryIndex].isCompleted;
	const updatedEntry = list.entries[entryIndex];

	entryIndex = DummyEntries.findIndex((entry) => entry.id === entryId);
	DummyEntries[entryIndex] = updatedEntry;

	return list;
};
