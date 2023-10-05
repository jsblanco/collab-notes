import { Reducer } from 'react';
import { User } from '@app/models';
import { IconNames } from '@app/ui';
import { ListIconOptions } from './ListFormScreen.icons';

type ReducerStateType = {
	inputValues: {
		title: string;
		description: string;
		icon: IconNames;
		users: User[];
	};
	inputValidities: {
		title: boolean;
		description: boolean;
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
	  }
	| {
			type: Actions.FORM_ARRAY_UPDATE;
			value?: User[];
			isValid?: boolean;
			input: string;
	  };

export enum Actions {
	FORM_UPDATE = 'FORM_UPDATE',
	FORM_RESET = 'FORM_RESET',
	FORM_ARRAY_UPDATE = 'FORM_ARRAY_UPDATE',
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
			return {
				inputValues: {
					title: '',
					description: '',
					icon: ListIconOptions[Math.floor(Math.random() * ListIconOptions.length)],
					users: [],
				},
				inputValidities: {
					title: false,
					description: true,
					icon: true,
					users: true,
				},
				formIsValid: false,
			};
		default:
			return { ...state };
	}
};
