
import * as constants from './entries.constants'
import {Entry} from "../../models/Entry/Entry";

type StateType = {
    entries: Entry[],
    error: string,
}

const initialState: StateType = {
    entries: [],
    error: '',
}

const entriesReducer = (state: StateType = initialState, {type, payload}: { type: string, payload: any }) => {
    switch (type) {
        case constants.FETCH_ENTRIES_SUCCESS:
            return {
                ...state,
                entries: payload
            }
        case constants.FETCH_ENTRIES_FAILURE:
            return {
                ...state,
                error: payload
            }
        case constants.FETCH_ENTRIES_REQUEST:
            return {
                ...state,
                error: ''
            }
        default:
            return {...state};
    }
}

export default entriesReducer;
