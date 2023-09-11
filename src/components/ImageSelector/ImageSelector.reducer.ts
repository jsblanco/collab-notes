import { Reducer } from 'react';

export enum ImageSelectorActions {
	ADD_PICTURE = 'ADD_PICTURE',
	REMOVE_PICTURE = 'REMOVE_PICTURE',
	FORM_RESET = 'FORM_RESET',
}
type StateType = { value: string[]; isValid: boolean; isTouched: boolean };
type ActionType =
	| {
			type: ImageSelectorActions.ADD_PICTURE | ImageSelectorActions.REMOVE_PICTURE;
			value: string;
			// isValid: boolean;
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
		case ImageSelectorActions.ADD_PICTURE:
			updatedValues = [`${a.value}`, ...state.value];
			// updatedValues.unshift('' + a.value)
			return {
				...state,
				value: updatedValues,
				isValid: true,
				isTouched: true,
			};
		case ImageSelectorActions.REMOVE_PICTURE:
			updatedValues = state.value.filter((img) => img !== a.value);
			updatedValidities = !!updatedValues.length;
			return {
				value: updatedValues,
				isValid: updatedValidities,
				isTouched: true,
			};
		case ImageSelectorActions.FORM_RESET:
			return { value: [], isValid: false, isTouched: false };
		default:
			return { ...state };
	}
};
