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
	switch (type) {
		case constants.FETCH_LISTS_SUCCESS:
			return {
				...state,
				lists: payload,
			};
		case constants.FETCH_LISTS_FAILURE:
			return {
				...state,
				error: payload,
			};
		case constants.FETCH_LISTS_REQUEST:
			return {
				...state,
				error: '',
			};
		case constants.MODIFY_LIST_SUCCESS:
			return {
				...state,
				lists: [
                    ...state.lists.filter(list=>list.id!==payload.id),
                    payload
                ],
			};
		case constants.MODIFY_LIST_FAILURE:
			return {
				...state,
				error: payload,
			};
		case constants.MODIFY_LIST_REQUEST:
			return {
				...state,
				error: '',
			};

		default:
			return { ...state };
	}
};

export default listsReducer;
