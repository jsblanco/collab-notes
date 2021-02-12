import * as constants from './lists.constants';
import {List} from "../../models/List/List";

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
