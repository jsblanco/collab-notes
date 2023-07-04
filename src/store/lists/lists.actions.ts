import * as constants from './lists.constants';
import {List} from "../../models/List/List";
import { Entry } from '../../models/Entry/Entry';

export const fetchLists = {
    request: () => {
        return {
            type: constants.FETCH_LISTS_REQUEST
        }
    },
    success: (lists: List[]) => {
        return {
            type: constants.FETCH_LISTS_SUCCESS,
            payload: lists
        }
    },
    failure: (e: any) => {
        return {
            type: constants.FETCH_LISTS_FAILURE,
            payload: e
        }
    }
}

export const fetchList = {
    request: (listId: string) => {
        return {
            type: constants.FETCH_LIST_REQUEST,
            payload: listId
        }
    },
    success: (list: List) => {
        return {
            type: constants.FETCH_LIST_SUCCESS,
            payload: list
        }
    },
    failure: (e: any) => {
        return {
            type: constants.FETCH_LIST_FAILURE,
            payload: e
        }
    }
}

export const modifyList = {
    request: () => {
        return {
            type: constants.MODIFY_LIST_REQUEST
        }
    },
    success: (updatedList: List) => {
        return {
            type: constants.MODIFY_LIST_SUCCESS,
            payload: updatedList
        }
    },
    failure: (e: any) => {
        return {
            type: constants.MODIFY_LIST_FAILURE,
            payload: e
        }
    }
}

export const addListEntry = {
	request: (listId: string, entry: Entry) => {
		return {
			type: constants.ADD_ENTRY_REQUEST,
			payload: {listId, entry},
		};
	},
	success: (payload: List) => {
		return {
			type: constants.ADD_ENTRY_SUCCESS,
			payload,
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
	success: (payload: List) => {
		return {
			type: constants.REMOVE_ENTRY_SUCCESS,
			payload,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.REMOVE_ENTRY_FAILURE,
			payload: e,
		};
	},
};

export const toggleEntryCompletion = {
	request: (listId: string, entryId: string) => {
		return {
			type: constants.TOGGLE_ENTRY_COMPLETION_REQUEST,
			payload: {listId, entryId},
		};
	},
	success: (list: List) => {
		return {
			type: constants.TOGGLE_ENTRY_COMPLETION_SUCCESS,
			payload: list,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.TOGGLE_ENTRY_COMPLETION_FAILURE,
			payload: e,
		};
	},
};

export const changeEntryListIndex = {
	request: (listId: string, entryOrder:  string[]) => {
		return {
			type: constants.CHANGE_ENTRY_ORDER_REQUEST,
			payload: {listId, entryOrder},
		};
	},
	success: (list: List) => {
		return {
			type: constants.CHANGE_ENTRY_ORDER_SUCCESS,
			payload: list,
		};
	},
	failure: (e: any) => {
		return {
			type: constants.CHANGE_ENTRY_ORDER_FAILURE,
			payload: e,
		};
	},
};