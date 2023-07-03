import { axiosInstance } from '../api/axios';
import { DummyEntries, DummyLists } from '../../../data/DummyData';
import { Entry } from '../../models/Entry/Entry';
import { List } from '../../models/List/List';

export const fetchEntries = (listId: string): Entry[] => {
	const list = DummyLists.find((list) => list.id === listId);
	if (!list) throw new Error('List not found');
	const entries: Entry[] = [];
	list.entries.map((entryId) => {
		const entry = DummyEntries.find((entry) => entry.id === entryId);
		if (entry) entries.push(entry);
	});
	return entries;
};

export interface addEntryToListReturn { list: List; entries: Entry[] }

export const addEntryToList = (
	listId: string,
	entry: Entry
): addEntryToListReturn => {
	const list = DummyLists.find((list) => list.id === listId);
	if (!list) throw new Error('List not found');
	const dbEntry = { ...entry, id: new Date().getTime().toString() };
	DummyEntries.push(dbEntry);
	list.entries.push(dbEntry.id);

	return { list, entries: fetchEntries(listId) };
};

export const removeListEntry = (listId: string, entryId: string): Entry[] => {
	const entryIndex = DummyEntries.findIndex((entry) => entry.id === entryId);
	DummyEntries.splice(entryIndex, 1);
	// if (!entryIndex) throw new Error('Entry not found');
	return fetchEntries(listId);
};
