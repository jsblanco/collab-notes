import { Reducer } from 'react';
import { FormControlStateType, FormControlAction, FormControlActions } from './FormControl.types';

export const formControlReducer: Reducer<
	FormControlStateType,
	FormControlAction
> = (state, action) => {
	switch (action.type) {
		case FormControlActions.INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid,
			};
		case FormControlActions.IS_TOUCHED:
			return {
				...state,
				isTouched: true,
			};
		case FormControlActions.FORM_RESET:
			return {
				value: '',
				isValid: false,
				isTouched: false,
			};
		default:
			return { ...state };
	}
};
