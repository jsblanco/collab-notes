import React, { useCallback, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
	getDrawerListLink,
} from '../../../navigation/NavigationTypes';
import { FloatingButton, Button, Container, H1, Row } from '../../../ui/libUi';
import { Actions, formReducer } from './ListEntryForm.reducer';
import FormControl from '../../../components/FormControl/FormControl';
import { useDispatch } from 'react-redux';
import { addListEntry } from '../../../store/lists/lists.actions';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.EntryForm>;

const ListEntryForm = ({ route, navigation }: Props): JSX.Element => {
	const { listId, entry } = route.params;

	const initialFormState = {
		inputValues: {
			title: entry?.title ?? '',
			description: entry?.description ?? '',
		},
		inputValidities: {
			title: !!entry,
			description: !!entry,
		},
		formIsValid: !!entry,
	};

	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(formReducer, initialFormState);

	const onSubmit = () => {
		if (!!formState.formIsValid)
			dispatch(
				addListEntry.request(listId, {
					id: '',
					...entry,
					...formState.inputValues,
				})
			);
		//@ts-ignore
		navigation.navigate(getDrawerListLink(listId), {
			screen: ListStackRoutes.ListEntries,
		});
	};

	const inputHandler = useCallback(
		(key: string, value: string, isValid: boolean) => {
			formDispatch({
				type: Actions.FORM_UPDATE,
				value: value,
				isValid: isValid,
				input: key,
			});
		},
		[formDispatch]
	);

	const onReset = useCallback(() => {
		formDispatch({
			type: Actions.FORM_RESET,
			value: initialFormState,
		});
	}, [initialFormState]);

	return (
		<Container style={styles.screen}>
			{/* <FloatingButton
				onPress={navigation.goBack}
				position={{top: 20, left: 20 }}
				// buttonStyle={{ position: 'absolute',       zIndex: 99, bottom: 400, left: 20 }}
				>
				Go back
			</FloatingButton> */}
				<H1>{entry ? `Edit task "${entry.title}"` : 'Create new task'}</H1>
			<Container style={{ flex: 1 }}>
				<FormControl
					label={'Name'}
					value={formState.inputValues.title}
					isValid={formState.inputValidities.title}
					inputName={'title'}
					placeholder={'Task name'}
					inputHandler={inputHandler}
					minLength={3}
					required
				/>
				<FormControl
					label={'Description'}
					inputName={'description'}
					placeholder={'Task description'}
					value={formState.inputValues.description}
					isValid={formState.inputValidities.description}
					inputHandler={inputHandler}
					multiline
					required
				/>
			</Container>
			<Row centerX>
				<Button onPress={onReset}>Reset form</Button>
				<Button onPress={onSubmit} disabled={!formState.formIsValid}>
					Submit
				</Button>
			</Row>
		</Container>
	);
};

export default ListEntryForm;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		position: 'relative',
		padding: 20,
		paddingTop: 90,
	},
});
