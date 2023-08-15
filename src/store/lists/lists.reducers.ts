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
	let updatedLists: List[] = [];

	switch (type) {
		case constants.FETCH_ALL_LISTS_SUCCESS:
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

		case constants.ADD_TASK_SUCCESS:
		case constants.REMOVE_TASK_SUCCESS:
		case constants.TOGGLE_TASK_COMPL_SUCCESS:
		case constants.CHANGE_TASK_ORDER_SUCCESS:
			listIndex = state.lists.findIndex((list) => list.id === payload.id);
			if (listIndex === -1) return { ...state };
			updatedLists = [...state.lists];
			updatedLists[listIndex] = payload;

			return {
				...state,
				lists: updatedLists,
			};
		case constants.CHANGE_TASK_ORDER_REQUEST:
		case constants.TOGGLE_TASK_COMPL_REQUEST:
		case constants.ADD_TASK_REQUEST:
		case constants.REMOVE_TASK_REQUEST:
		case constants.FETCH_TASKS_REQUEST:
		case constants.FETCH_ALL_LISTS_REQUEST:
		case constants.MODIFY_LIST_REQUEST:
			return {
				...state,
				error: '',
			};
		case constants.CHANGE_TASK_ORDER_FAILURE:
		case constants.TOGGLE_TASK_COMPL_FAILURE:
		case constants.ADD_TASK_FAILURE:
		case constants.FETCH_TASKS_FAILURE:
		case constants.REMOVE_TASK_FAILURE:
		case constants.FETCH_ALL_LISTS_FAILURE:
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
