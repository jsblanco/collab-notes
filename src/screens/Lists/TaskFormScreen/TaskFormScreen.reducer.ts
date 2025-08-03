import type { Periodicity } from "@app/models";
import type { DbImage } from "@app/models/DbImage.models";
import type { Reducer } from "react";

type TaskFormValues = {
	title: string;
	description: string;
	periodicity: Periodicity;
	images: DbImage[];
};

export type TaskFormKeys = keyof TaskFormValues;

type ReducerStateType = {
	inputValues: TaskFormValues;
	inputValidities: { [K in TaskFormKeys]: boolean };
	formIsValid: boolean;
};

type ActionsType =
	| {
			type: Actions.FORM_RESET;
			value: ReducerStateType;
	  }
	| {
			type: Actions.FORM_UPDATE;
			isValid?: boolean;
			input: "title" | "description" | "periodicity";
			value: string;
	  }
	| {
			type: Actions.FORM_ARRAY_UPDATE;
			value: DbImage[];
			isValid?: boolean;
			input: "images";
	  };

export enum Actions {
	FORM_UPDATE = "FORM_UPDATE",
	FORM_ARRAY_UPDATE = "FORM_ARRAY_UPDATE",
	FORM_RESET = "FORM_RESET",
}

export const formReducer: Reducer<ReducerStateType, ActionsType> = (
	state,
	a,
) => {
	let updatedValues: TaskFormValues;
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
					updatedFormIsValid &&
					updatedValidities[key as keyof ReducerStateType["inputValidities"]];
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
