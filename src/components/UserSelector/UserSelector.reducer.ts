import { Reducer } from 'react';

export enum ImageSelectorActions {
	ADD_USER = 'ADD_USER',
	REMOVE_USER = 'REMOVE_USER',
	FORM_RESET = 'FORM_RESET',
}
type StateType = { value: string[]; isValid: boolean; isTouched: boolean };
type ActionType =
	| {
			type: ImageSelectorActions.ADD_USER;
			value: string;
			isValid: boolean;
	  }
	| {
			type: ImageSelectorActions.REMOVE_USER;
			value: string;
			isValid: boolean;
	  }
	| {
			type: ImageSelectorActions.FORM_RESET;
	  };

export const imageSelectorReducer: Reducer<StateType, ActionType> = (
	state,
	a
) => {
	let updatedValues, updatedValidities;
	switch (a.type) {
		case ImageSelectorActions.ADD_USER:
			updatedValues = [a.value, ...state.value];
			// updatedValues.unshift('' + a.value)
			return {
				...state,
				value: updatedValues,
				isValid: a.isValid,
				isTouched: true,
			};
		case ImageSelectorActions.REMOVE_USER:
			updatedValues = state.value.filter((userId) => userId !== a.value);
			return {
				value: updatedValues,
				isValid: a.isValid,
				isTouched: true,
			};
		case ImageSelectorActions.FORM_RESET:
			return { value: [], isValid: false, isTouched: false };
		default:
			return { ...state };
	}
};
