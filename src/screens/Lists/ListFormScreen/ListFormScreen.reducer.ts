import type { User } from "@app/models";
import type { IconNames } from "@app/ui";
import type { Reducer } from "react";
import { ListIconOptions } from "./ListFormScreen.icons";

type ListFormValues = {
	title: string;
	description: string;
	icon: IconNames;
	users: User[];
};

type ListFormKeys = keyof ListFormValues;

type ReducerStateType = {
	inputValues: ListFormValues;
	inputValidities: { [k in ListFormKeys]: boolean };
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
	FORM_UPDATE = "FORM_UPDATE",
	FORM_RESET = "FORM_RESET",
	FORM_ARRAY_UPDATE = "FORM_ARRAY_UPDATE",
}

export const formReducer: Reducer<ReducerStateType, ActionsType> = (
	state,
	a,
) => {
	let updatedValues: ListFormValues;
	let updatedValidities: ReducerStateType["inputValidities"];

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
			for (const key in updatedValidities) {
				updatedFormIsValid =
					updatedFormIsValid && updatedValidities[key as ListFormKeys];
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
					title: "",
					description: "",
					icon: ListIconOptions[
						Math.floor(Math.random() * ListIconOptions.length)
					],
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
