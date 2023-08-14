import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../../navigation/NavigationTypes';
import { FloatingButton, Container } from '../../../ui/libUi';
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

	useEffect(
		() =>
			navigation.setOptions({
				title: entry ? `Edit task "${entry.title}"` : 'Create new task',
			}),
		[entry]
	);

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
		navigation.goBack();
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
			<FloatingButton onPress={onSubmit}>
				{entry ? 'Update task' : 'Create new task'}
			</FloatingButton>
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
	},
});
