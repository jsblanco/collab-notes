import { List, TaskDto } from '@app/models';
import constants from './lists.constants';
import { AddListPayload } from './list.types';

export const fetchSingleList = {
	request: (listId: string) => {
		return {
			type: constants.FETCH_SINGLE_LIST_REQUEST,
			payload: listId,
		};
	},
	success: (list: List) => {
		return {
			type: constants.FETCH_SINGLE_LIST_SUCCESS,
			payload: list,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.FETCH_SINGLE_LIST_FAILURE,
			payload: e,
		};
	},
};

export const fetchAllLists = {
	request: () => {
		return {
			type: constants.FETCH_ALL_LISTS_REQUEST,
		};
	},
	success: (lists: List[]) => {
		return {
			type: constants.FETCH_ALL_LISTS_SUCCESS,
			payload: lists,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.FETCH_ALL_LISTS_FAILURE,
			payload: e,
		};
	},
};

export const modifyList = {
	request: () => {
		return {
			type: constants.MODIFY_LIST_REQUEST,
		};
	},
	success: (updatedList: List) => {
		return {
			type: constants.MODIFY_LIST_SUCCESS,
			payload: updatedList,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.MODIFY_LIST_FAILURE,
			payload: e,
		};
	},
};

export const addList = {
	request: (payload: AddListPayload) => {
		return {
			type: constants.ADD_LIST_REQUEST,
			payload: payload,
		};
	},
	success: (payload: List) => {
		return {
			type: constants.ADD_LIST_SUCCESS,
			payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.ADD_LIST_FAILURE,
			payload: e,
		};
	},
};

export const addListTask = {
	request: (listId: string, task: TaskDto) => {
		return {
			type: constants.ADD_TASK_REQUEST,
			payload: { listId, task },
		};
	},
	success: (payload: List) => {
		return {
			type: constants.ADD_TASK_SUCCESS,
			payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.ADD_TASK_FAILURE,
			payload: e,
		};
	},
};

export const removeListTask = {
	request: (listId: string, taskId: string) => {
		return {
			type: constants.REMOVE_TASK_REQUEST,
			payload: { listId, taskId },
		};
	},
	success: (payload: List) => {
		return {
			type: constants.REMOVE_TASK_SUCCESS,
			payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.REMOVE_TASK_FAILURE,
			payload: e,
		};
	},
};

export const toggleTaskCompletion = {
	request: (listId: string, taskId: string) => {
		return {
			type: constants.TOGGLE_TASK_COMPL_REQUEST,
			payload: { listId, taskId },
		};
	},
	success: (list: List) => {
		return {
			type: constants.TOGGLE_TASK_COMPL_SUCCESS,
			payload: list,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.TOGGLE_TASK_COMPL_FAILURE,
			payload: e,
		};
	},
};

export const changeTaskListIndex = {
	request: (listId: string, taskOrder: string[]) => {
		return {
			type: constants.CHANGE_TASK_ORDER_REQUEST,
			payload: { listId, taskOrder },
		};
	},
	success: (list: List) => {
		return {
			type: constants.CHANGE_TASK_ORDER_SUCCESS,
			payload: list,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.CHANGE_TASK_ORDER_FAILURE,
			payload: e,
		};
	},
};
