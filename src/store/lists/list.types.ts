import { Task } from 'redux-saga';
import { List, User } from '@app/models';
import { IconNames } from '@app/ui';
import constants from './lists.constants';

export interface AddListPayload {
	title: string;
	icon: IconNames;
	users: User[];
	id?: string;
}

export type StateType = {
	// todo - check this key for deletion
	selectedList?: string;
	lists: List[];
	error: string;
	loading: boolean;
};

export type ListActionsType =
	| {
			type:
				| constants.FETCH_ALL_LISTS_REQUEST
				| constants.FETCH_SINGLE_LIST_REQUEST
				| constants.MODIFY_LIST_REQUEST
				| constants.FETCH_TASKS_REQUEST
				| constants.ADD_LIST_REQUEST
				| constants.DELETE_LIST_REQUEST
				| constants.ADD_TASK_REQUEST
				| constants.REMOVE_TASK_REQUEST
				| constants.TOGGLE_TASK_COMPL_REQUEST
				| constants.CHANGE_TASK_ORDER_REQUEST
				| constants.CONSTANT_NAME_REQUEST;
			payload: undefined;
	  }
	| {
			type: constants.FETCH_ALL_LISTS_SUCCESS;
			payload: List[];
	  }
	| {
			type: constants.ADD_LIST_SUCCESS;
			payload: List;
	  }
	| {
			type: constants.DELETE_LIST_SUCCESS;
			payload: string;
	  }
	| {
			type:
				| constants.ADD_TASK_SUCCESS
				| constants.REMOVE_TASK_SUCCESS
				| constants.TOGGLE_TASK_COMPL_SUCCESS
				| constants.CHANGE_TASK_ORDER_SUCCESS;
			payload: List;
	  }
	| {
			type:
				| constants.CHANGE_TASK_ORDER_FAILURE
				| constants.TOGGLE_TASK_COMPL_FAILURE
				| constants.ADD_TASK_FAILURE
				| constants.DELETE_LIST_FAILURE
				| constants.ADD_LIST_FAILURE
				| constants.FETCH_TASKS_FAILURE
				| constants.REMOVE_TASK_FAILURE
				| constants.FETCH_ALL_LISTS_FAILURE
				| constants.MODIFY_LIST_FAILURE;
			payload: string;
	  };
