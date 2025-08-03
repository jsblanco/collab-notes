import type { Reducer } from "react";

export type RadioInputStateType = {
	value: string;
	isValid: boolean;
	isTouched: boolean;
};

export enum RadioInputActions {
	INPUT_CHANGE = "INPUT_CHANGE",
	IS_TOUCHED = "IS_TOUCHED",
}
export type RadioInputAction =
	| {
			type: RadioInputActions.INPUT_CHANGE;
			value: string;
			isValid: boolean;
	  }
	| {
			type: RadioInputActions.IS_TOUCHED;
	  };

export const RadioInputReducer: Reducer<
	RadioInputStateType,
	RadioInputAction
> = (state, a) => {
	switch (a.type) {
		case RadioInputActions.INPUT_CHANGE:
			return {
				...state,
				value: a.value,
				isValid: a.isValid,
			};
		case RadioInputActions.IS_TOUCHED:
			return {
				...state,
				isTouched: true,
			};
		default:
			return { ...state };
	}
};
