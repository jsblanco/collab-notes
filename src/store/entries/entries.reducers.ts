
import * as constants from './entries.constants'

type StateType = {
    key: any,
}

const initialState: StateType = {
    key: undefined
}

const entriesReducer = (state: StateType = initialState, {type, payload}: { type: string, payload: any }) => {
    switch (type) {
        case constants.CONSTANT_NAME_SUCCESS:
            return {...state}
        default:
            return {...state};
    }
}

export default entriesReducer;
