import React, { useEffect, useReducer } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, InfoTooltip, Label, Row, Text } from '@app/ui';
import { RadioInputActions, RadioInputReducer } from './RadioInput.reducer';

type OptionType = { label: string; id: string };
type RadioInputType = {
	options: OptionType[];
	label: string;
	value: string;
	isValid: boolean;
	inputName: string;
	tooltip: string;
	inputHandler: (key: string, value: string, isValid: boolean) => void;
};

const RadioInput = (props: RadioInputType) => {
	const { label, options, value, isValid, inputName, inputHandler, tooltip } =
		props;
	const [state, dispatch] = useReducer(RadioInputReducer, {
		value: value ? value : '',
		isValid: isValid,
		isTouched: false,
	});

	const selectionHandler = (id: string) => {
		dispatch({ type: RadioInputActions.INPUT_CHANGE, value: id, isValid: true });
	};

	useEffect(() => {
		inputHandler(inputName, state.value, state.isValid);
	}, [inputHandler, state, value]);

	return (
		<View style={styles.screen}>
			<Row
				style={styles.titleRow}
				alignItems="center"
				justifyContent="space-between">
				<Label>{label}</Label>
				{!!tooltip && <InfoTooltip message={tooltip} />}
			</Row>
			<View style={styles.options}>
				{options.map((option, index) => (
					<Row justifyContent={'flex-start'} key={index}>
						<Pressable
							onPress={selectionHandler.bind(this, option.id)}
							style={[
								styles.emptyInput,
								option.id === state.value && styles.activeInputOutline,
							]}>
							{option.id === state.value && <View style={styles.activeInputFill} />}
						</Pressable>
						<Text style={styles.label}>{option.label}</Text>
					</Row>
				))}
			</View>
		</View>
	);
};

export default RadioInput;

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
	},
	titleRow: {
		zIndex: 2,
	},
	emptyInput: {
		width: 22,
		height: 22,
		borderWidth: 2,
		borderRadius: 22,
		borderColor: colors.grey[3],
	},
	activeInputOutline: {
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: colors.accent,
	},
	activeInputFill: {
		backgroundColor: colors.accent,
		borderRadius: 14,
		height: 14,
		width: 14,
	},
	label: {
		paddingLeft: 20,
	},
	options: {
		marginTop: 10,
		paddingLeft: 20,
	},
});
