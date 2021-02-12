import * as constants from './lists.constants';

export const fetchLists = {
    request: (payload: any) => {
        return {
            type: constants.FETCH_LISTS_REQUEST,
            payload: payload
        }
    },
    success: (payload: any) => {
        return {
            type: constants.FETCH_LISTS_SUCCESS,
            payload: payload
        }
    },
    failure: (e: any) => {
        return {
            type: constants.FETCH_LISTS_FAILURE,
            payload: e
        }
    }
}
