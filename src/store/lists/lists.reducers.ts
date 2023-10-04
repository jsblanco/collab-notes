import { Reducer } from 'redux';
import { List } from '@app/models';
import { ListActionsType, StateType } from './list.types';
import constants from './lists.constants';

const initialState: StateType = {
	lists: [],
	error: '',
	loading: false,
};

const listsReducer: Reducer<StateType, ListActionsType> = (
	state: StateType = initialState,
	{ type, payload }
) => {
	let listIndex: number = -1;
	let updatedLists: List[] = [];

	switch (type) {
		case constants.FETCH_ALL_LISTS_SUCCESS:
			return {
				...state,
				lists: payload,
				loading: false,
			};
		case constants.DELETE_LIST_SUCCESS:
			return {
				...state,
				lists: state.lists.filter((list) => list.id !== (payload as string)),
			};
		case constants.ADD_LIST_SUCCESS:
			listIndex = state.lists.findIndex((list) => list.id === payload.id);
			updatedLists = [...state.lists];
			listIndex > -1
				? (updatedLists[listIndex] = payload)
				: updatedLists.push(payload);

			return {
				...state,
				lists: updatedLists,
				loading: false,
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
				loading: false,
			};
		case constants.CHANGE_TASK_ORDER_REQUEST:
		case constants.TOGGLE_TASK_COMPL_REQUEST:
		case constants.ADD_TASK_REQUEST:
		case constants.REMOVE_TASK_REQUEST:
		case constants.FETCH_TASKS_REQUEST:
		case constants.DELETE_LIST_REQUEST:
		case constants.FETCH_ALL_LISTS_REQUEST:
		case constants.MODIFY_LIST_REQUEST:
			return {
				...state,
				error: '',
				loading: true,
			};
		case constants.CHANGE_TASK_ORDER_FAILURE:
		case constants.TOGGLE_TASK_COMPL_FAILURE:
		case constants.ADD_TASK_FAILURE:
		case constants.DELETE_LIST_FAILURE:
		case constants.ADD_LIST_FAILURE:
		case constants.FETCH_TASKS_FAILURE:
		case constants.REMOVE_TASK_FAILURE:
		case constants.FETCH_ALL_LISTS_FAILURE:
		case constants.MODIFY_LIST_FAILURE:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return { ...state };
	}
};

export default listsReducer;
