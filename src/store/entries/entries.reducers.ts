import * as constants from './entries.constants';
import { Entry } from '../../models/Entry/Entry';

type StateType = {
	entries: Entry[];
	error: string;
};

const initialState: StateType = {
	entries: [],
	error: '',
};

const entriesReducer = (
	state: StateType = initialState,
	{ type, payload }: { type: string; payload: any }
) => {
	switch (type) {
		case constants.FETCH_ENTRIES_SUCCESS:
			return {
				...state,
				entries: payload as Entry[],
			};
		case constants.ADD_ENTRY_SUCCESS:
			return {
				...state,
				entries: (payload.entries as Entry[]),
			};
		case constants.REMOVE_ENTRY_SUCCESS:
			return {
				...state,
				entries: state.entries.filter((entry) => entry.id !== payload) as Entry[],
			};
		case constants.TOGGLE_ENTRY_COMPLETION_SUCCESS:
			return {
				...state,
				entries: [
					...state.entries.filter((entry) => entry.id !== payload.id) as Entry[],
					payload as Entry,
				],
			};
		case constants.TOGGLE_ENTRY_COMPLETION_REQUEST:
		case constants.ADD_ENTRY_REQUEST:
		case constants.REMOVE_ENTRY_REQUEST:
		case constants.FETCH_ENTRIES_REQUEST:
			return {
				...state,
				error: '',
			};
		case constants.TOGGLE_ENTRY_COMPLETION_FAILURE:
		case constants.ADD_ENTRY_FAILURE:
		case constants.FETCH_ENTRIES_FAILURE:
		case constants.REMOVE_ENTRY_FAILURE:
			return {
				...state,
				error: payload,
			};
		default:
			return { ...state };
	}
};

export default entriesReducer;
