import { colors, ErrorMessage, fonts, InfoTooltip, Label, Row } from "@app/ui";
import { useEffect, useReducer, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { formControlReducer } from "./FormControl.reducer";
import { FormControlActions, type FormControlType } from "./FormControl.types";

const FormControl = (props: FormControlType) => {
	const {
		label,
		value,
		inputName,
		isValid,
		tooltip,
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
		keyboardType = "email-address",
		autoComplete = "off",
		autoCapitalize = "sentences",
		numberOfLines = 1,
		onInputCheck,
	} = props;

	const [error, setError] = useState<string>("");
	const [state, dispatch] = useReducer(formControlReducer, {
		value: value ?? "",
		isValid: isValid,
		isTouched: false,
	});

	const stringChangeHandler = (input: string) => {
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const numberRegex = /^-?\d*(\.\d+)?$/;
		let isValid = true;

		if (
			(required && input.trim().length === 0) ||
			(email && !emailRegex.test(input.toLowerCase())) ||
			(typeof min === "number" && parseFloat(input) < min) ||
			(typeof max === "number" && parseFloat(input) > max) ||
			(typeof minLength === "number" && input.length < minLength) ||
			(typeof maxLength === "number" && input.length > maxLength) ||
			((keyboardType === "numeric" ||
				keyboardType === "number-pad" ||
				keyboardType === "decimal-pad") &&
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <needed>
	useEffect(() => {
		inputHandler(inputName, state.value, state.isValid);
	}, [inputHandler, state, value, error, inputName]);

	useEffect(() => {
		if (state.value !== "" && value === "")
			dispatch({ type: FormControlActions.FORM_RESET });
	}, [value, state.value]);

	return (
		<View style={styles.formControl}>
			<Row
				style={styles.titleRow}
				alignItems="center"
				justifyContent="space-between"
			>
				<Label>{label}</Label>
				{!!tooltip && <InfoTooltip message={tooltip} />}
			</Row>
			<TextInput
				style={{
					...styles.input,
					...(numberOfLines && { minHeight: numberOfLines * 24 + 22 }),
				}}
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
				placeholderTextColor={colors.grey["3"]}
			/>
			{required && state.isTouched && !state.isValid && error && (
				<ErrorMessage>{error}</ErrorMessage>
			)}
		</View>
	);
};

export default FormControl;

const styles = StyleSheet.create({
	formControl: {
		paddingVertical: 10,
		width: "100%",
	},
	titleRow: {
		zIndex: 2,
	},
	input: {
		width: "100%",
		fontSize: 16,
		lineHeight: 24,
		fontFamily: fonts.regularBold,
		textAlignVertical: "top",
		backgroundColor: colors.grey[4],
		padding: 10,
		paddingTop: 14,
		borderRadius: 5,
	},
	warning: {
		color: colors.danger,
		fontFamily: fonts.regular,
		textAlign: "center",
	},
});
