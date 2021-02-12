import * as constants from './entries.constants';
import {Entry} from "../../models/Entry/Entry";

export const fetchListEntries = {
    request: (listId: string) => {
        return {
            type: constants.FETCH_ENTRIES_REQUEST,
            payload: listId
        }
    },
    success: (payload: Entry[]) => {
        return {
            type: constants.FETCH_ENTRIES_SUCCESS,
            payload: payload
        }
    },
    failure: (e: any) => {
        return {
            type: constants.FETCH_ENTRIES_FAILURE,
            payload: e
        }
    }
}
