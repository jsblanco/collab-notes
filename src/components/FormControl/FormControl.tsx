import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, Error, fonts, Label } from '../../ui';
import { formControlReducer } from './FormControl.reducer';
import { FormControlActions, FormControlType } from './FormControl.types';

const FormControl = (props: FormControlType) => {
	const {
		label,
		value,
		inputName,
		isValid,
		inputHandler,
		placeholder,
		min,
		max,
		minLength,
		maxLength,
		email,
		required,
		multiline = false,
		autoCorrect = true,
		secureTextEntry = false,
		keyboardType = 'email-address',
		autoComplete = 'off',
		autoCapitalize = 'sentences',
		numberOfLines = 1,
		onInputCheck,
	} = props;

	const [error, setError] = useState<string>('');
	const [state, dispatch] = useReducer(formControlReducer, {
		value: value ?? '',
		isValid: !!isValid,
		isTouched: false,
	});

	const stringChangeHandler = (input: string) => {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const numberRegex = /^-?\d*(\.\d+)?$/;
		let isValid = true;

		if (
			(required && input.trim().length === 0) ||
			(email && !emailRegex.test(input.toLowerCase())) ||
			(typeof min === 'number' && parseFloat(input) < min) ||
			(typeof max === 'number' && parseFloat(input) > max) ||
			(typeof minLength === 'number' && input.length < minLength) ||
			(typeof maxLength === 'number' && input.length > maxLength) ||
			((keyboardType === 'numeric' ||
				keyboardType === 'number-pad' ||
				keyboardType === 'decimal-pad') &&
				!numberRegex.test(input))
		)
			isValid = false;

		if (!isValid)
			setError(`Please input a valid ${(label ?? inputName).toLowerCase()}`);

		dispatch({
			type: FormControlActions.INPUT_CHANGE,
			value: input,
			isValid: isValid,
		});
	};

	const lostFocusHandler = async () => {
		dispatch({ type: FormControlActions.IS_TOUCHED });
		if (onInputCheck && state.isValid) {
			const externalCheck = await onInputCheck(value);
			setError(externalCheck.errorMessage);
			dispatch({
				type: FormControlActions.INPUT_CHANGE,
				value: state.value,
				isValid: externalCheck.isValid,
			});
		}
	};

	useEffect(() => {
		inputHandler(inputName, state.value, state.isValid);
	}, [inputHandler, state, value, error]);

	useEffect(() => {
		if (state.value !== '' && value === '')
			dispatch({ type: FormControlActions.FORM_RESET });
	}, [value]);

	return (
		<View style={styles.formControl}>
			<Label>{label}</Label>
			<TextInput
				style={styles.input}
				value={state.value}
				multiline={multiline}
				onBlur={lostFocusHandler}
				autoCorrect={autoCorrect}
				placeholder={placeholder}
				keyboardType={keyboardType}
				numberOfLines={numberOfLines}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secureTextEntry}
				onChangeText={stringChangeHandler}
				autoComplete={autoComplete}
				placeholderTextColor={colors.grey['3']}
			/>
			{required && state.isTouched && !state.isValid && <Error>{error}</Error>}
		</View>
	);
};

export default FormControl;

const styles = StyleSheet.create({
	formControl: {
		paddingVertical: 10,
		width: '100%',
	},
	input: {
		width: '100%',
		fontSize: 16,
		lineHeight: 22,
		fontFamily: fonts.regularBold,
		backgroundColor: colors.grey[4],
		padding: 10,
		paddingTop: 12,
		borderRadius: 5,
	},
	warning: {
		color: colors.danger,
		fontFamily: fonts.regular,
		textAlign: 'center',
	},
});
