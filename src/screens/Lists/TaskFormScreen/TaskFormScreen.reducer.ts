import { Reducer } from 'react';

type ReducerStateType = {
	inputValues: {
		title: string;
		description: string;
		images: string[];
	};
	inputValidities: {
		title: boolean;
		description: boolean;
		images: boolean;
	};
	formIsValid: boolean;
};

type ActionsType =
	| {
			type: Actions.FORM_RESET;
			value: ReducerStateType;
	  }
	| {
			type: Actions.FORM_UPDATE;
			value?: string;
			isValid?: boolean;
			input: string;
	  }
	| {
			type: Actions.FORM_ARRAY_UPDATE;
			value?: string[];
			isValid?: boolean;
			input: string;
	  };

export enum Actions {
	FORM_UPDATE = 'FORM_UPDATE',
	FORM_ARRAY_UPDATE = 'FORM_ARRAY_UPDATE',
	FORM_RESET = 'FORM_RESET',
}

export const formReducer: Reducer<ReducerStateType, ActionsType> = (
	state,
	a
) => {
	let updatedValues, updatedValidities;
	let updatedFormIsValid = true;
	switch (a.type) {
		case Actions.FORM_UPDATE:
		case Actions.FORM_ARRAY_UPDATE:
			if (!a.input) return { ...state };
			updatedValues = {
				...state.inputValues,
				[a.input]: a.value,
			};
			updatedValidities = {
				...state.inputValidities,
				[a.input]: a.isValid,
			};
			for (let key in updatedValidities) {
				updatedFormIsValid = !!(updatedFormIsValid && updatedValidities[key]);
			}
			return {
				...state,
				inputValues: updatedValues,
				inputValidities: updatedValidities,
				formIsValid: updatedFormIsValid,
			};
		case Actions.FORM_RESET:
			return { ...a.value };
		default:
			return { ...state };
	}
};
