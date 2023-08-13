import {FormControlReducerType} from "./FormControl.types";

export const INPUT_CHANGE = 'INPUT_CHANGE';
export const IS_TOUCHED = 'IS_TOUCHED';
export const FORM_RESET = 'FORM_RESET';
export const formControlReducer = (state: any, {type, value, isValid}: FormControlReducerType) => {
    switch (type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: value,
                isValid: isValid,
            }
        case IS_TOUCHED:
            return {
                ...state,
                isTouched: true
            }
        case FORM_RESET:
            return {
                value: '',
                isValid: false,
                isTouched: false,
            }
        default:
            return {...state};
    }
}
