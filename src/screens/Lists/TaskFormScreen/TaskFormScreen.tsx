import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import FormControl from '@app/components/FormControl/FormControl';
import {
	ListStackProps,
	ListStackRoutes,
} from '@app/navigation/NavigationTypes';
import { addListTask } from '@app/store/lists/lists.actions';
import { RootState } from '@app/store/store';
import { Container, FloatingButton } from '@app/ui';
import { Actions, formReducer } from './TaskFormScreen.reducer';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.TaskForm>;

const TaskFormScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId, taskId } = route.params;
	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => listId === list.id)
	) ?? { pendingTasks: [], completedTasks: [] };

	const task = [...list?.pendingTasks, ...list?.completedTasks].find(
		(task) => task.id === taskId
	);

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
					history: [],
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
				numberOfLines={4}
				maxLength={300}
				multiline
				required
			/>
			<FloatingButton disabled={!formState.formIsValid} onPress={onSubmit}>
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
