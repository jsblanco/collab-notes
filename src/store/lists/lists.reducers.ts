import * as constants from './lists.constants';
import { List } from '../../models/List/List';

type StateType = {
	lists: List[];
	error: string;
};

const initialState: StateType = {
	lists: [],
	error: '',
};

const listsReducer = (
	state: StateType = initialState,
	{ type, payload }: { type: string; payload: any }
) => {
	let listIndex: number = -1;
	let entryIndex: number = -1;
	let updatedLists: List[] = [];
	let updatedList: List;

	switch (type) {
		case constants.FETCH_LISTS_SUCCESS:
			return {
				...state,
				lists: payload as List[],
			};
		case constants.MODIFY_LIST_SUCCESS:
			return {
				...state,
				lists: [
					...(state.lists.filter((list) => list.id !== payload.id) as List[]),
					payload as List,
				],
			};

		case constants.ADD_ENTRY_SUCCESS:
		case constants.REMOVE_ENTRY_SUCCESS:
		case constants.TOGGLE_ENTRY_COMPLETION_SUCCESS:
		case constants.CHANGE_ENTRY_ORDER_SUCCESS:
			listIndex = state.lists.findIndex((list) => list.id === payload.id);
			if (listIndex === -1) return { ...state };
			updatedLists = [...state.lists];
			updatedLists[listIndex] = payload;

			return {
				...state,
				lists: updatedLists,
			};
		case constants.CHANGE_ENTRY_ORDER_REQUEST:
		case constants.TOGGLE_ENTRY_COMPLETION_REQUEST:
		case constants.ADD_ENTRY_REQUEST:
		case constants.REMOVE_ENTRY_REQUEST:
		case constants.FETCH_ENTRIES_REQUEST:
		case constants.FETCH_LISTS_REQUEST:
		case constants.MODIFY_LIST_REQUEST:
			return {
				...state,
				error: '',
			};
		case constants.CHANGE_ENTRY_ORDER_FAILURE:
		case constants.TOGGLE_ENTRY_COMPLETION_FAILURE:
		case constants.ADD_ENTRY_FAILURE:
		case constants.FETCH_ENTRIES_FAILURE:
		case constants.REMOVE_ENTRY_FAILURE:
		case constants.FETCH_LISTS_FAILURE:
		case constants.MODIFY_LIST_FAILURE:
			return {
				...state,
				error: payload,
			};
		default:
			return { ...state };
	}
};

export default listsReducer;
