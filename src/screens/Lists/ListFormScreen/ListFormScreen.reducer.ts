import { Reducer } from 'react';
import { IconNames } from '@app/ui';
import { ListIconOptions } from './ListFormScreen.icons';

type ReducerStateType = {
	inputValues: {
		title: string;
		icon: IconNames;
		users: string[];
	};
	inputValidities: {
		title: boolean;
		icon: boolean;
		users: boolean;
	};
	formIsValid: boolean;
};

type ActionsType =
	| {
			type: Actions.FORM_RESET;
	  }
	| {
			type: Actions.FORM_UPDATE;
			value?: string;
			isValid?: boolean;
			input?: string;
	  };

export enum Actions {
	FORM_UPDATE = 'FORM_UPDATE',
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
			return {
				inputValues: {
					title: '',
					icon: ListIconOptions[Math.floor(Math.random() * ListIconOptions.length)],
					users: [],
				},
				inputValidities: {
					title: false,
					icon: true,
					users: true,
				},
				formIsValid: false,
			};
		default:
			return { ...state };
	}
};
