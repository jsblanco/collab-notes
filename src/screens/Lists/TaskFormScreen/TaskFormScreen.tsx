import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../../navigation/NavigationTypes';
import { FloatingButton, Container } from '../../../ui/libUi';
import { Actions, formReducer } from './TaskFormScreen.reducer';
import FormControl from '../../../components/FormControl/FormControl';
import { useDispatch } from 'react-redux';
import { addListTask } from '../../../store/lists/lists.actions';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.TaskForm>;

const TaskFormScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId, task } = route.params;

	const initialFormState = {
		inputValues: {
			title: task?.title ?? '',
			description: task?.description ?? '',
		},
		inputValidities: {
			title: !!task,
			description: !!task,
		},
		formIsValid: !!task,
	};

	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(formReducer, initialFormState);

	useEffect(
		() =>
			navigation.setOptions({
				title: task ? `Edit task "${task.title}"` : 'Create new task',
			}),
		[task]
	);

	const onSubmit = () => {
		if (!!formState.formIsValid)
			dispatch(
				addListTask.request(listId, {
					id: '',
					listId,
					...task,
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

	// const onReset = useCallback(() => {
	// 	formDispatch({
	// 		type: Actions.FORM_RESET,
	// 		value: initialFormState,
	// 	});
	// }, [initialFormState]);

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
				maxLength={30}
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
				{task ? 'Update task' : 'Create new task'}
			</FloatingButton>
		</Container>
	);
};

export default TaskFormScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		position: 'relative',
		padding: 20,
	},
});
