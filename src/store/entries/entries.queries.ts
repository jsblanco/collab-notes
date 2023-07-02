import { axiosInstance } from '../api/axios';
import { DummyEntries, DummyLists } from '../../../data/DummyData';
import { Entry } from '../../models/Entry/Entry';

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

export const removeListEntry = (listId: string, entryId: string): Entry[] => {
console.log(listId, entryId)

	const entryIndex = DummyEntries.findIndex((entry) => entry.id === entryId);
    console.log(entryIndex)
	DummyEntries.splice(entryIndex, 1);
	// if (!entryIndex) throw new Error('Entry not found');
	return fetchEntries(listId);
};
