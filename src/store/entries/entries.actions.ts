import * as constants from './entries.constants';
import { Entry } from '../../models/Entry/Entry';
import { List } from '../../models/List/List';

export const fetchListEntries = {
	request: (listId: string) => {
		return {
			type: constants.FETCH_ENTRIES_REQUEST,
			payload: listId,
		};
	},
	success: (payload: Entry[]) => {
		return {
			type: constants.FETCH_ENTRIES_SUCCESS,
			payload: payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.FETCH_ENTRIES_FAILURE,
			payload: e,
		};
	},
};

export const addListEntry = {
	request: (listId: string, entry: Entry) => {
		return {
			type: constants.ADD_ENTRY_REQUEST,
			payload: {listId, entry},
		};
	},
	success: (payload: Entry[]) => {
		return {
			type: constants.ADD_ENTRY_SUCCESS,
			payload: payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.ADD_ENTRY_FAILURE,
			payload: e,
		};
	},
};

export const removeListEntry = {
	request: (listId: string, entryId: string) => {
		return {
			type: constants.REMOVE_ENTRY_REQUEST,
			payload: { listId, entryId },
		};
	},
	success: (payload: Entry[]) => {
		return {
			type: constants.REMOVE_ENTRY_SUCCESS,
			payload: payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.REMOVE_ENTRY_FAILURE,
			payload: e,
		};
	},
};
