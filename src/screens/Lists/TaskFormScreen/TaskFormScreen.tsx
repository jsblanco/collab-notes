import React, { useCallback, useEffect, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import FormControl from '@app/components/FormControl/FormControl';
import ImageSelector from '@app/components/ImageSelector/ImageSelector';
import { ListStackProps, ListStackRoutes } from '@app/router/NavigationTypes';
import { addListTask, RootState } from '@app/store';
import { Container, FloatingButton } from '@app/ui';
import { Actions, formReducer } from './TaskFormScreen.reducer';
import { DbImage } from '@app/models/DbImage.models';

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
			images: task?.images ?? [],
			description: task?.description ?? '',
		},
		inputValidities: {
			images: true,
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

	const arrayInputHandler = useCallback(
		(key: string, value: DbImage[] = [], isValid: boolean) => {
			formDispatch({
				type: Actions.FORM_ARRAY_UPDATE,
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
			<View style={styles.formControl}>
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
			</View>
			<ImageSelector
				label={'Add image'}
				inputName={'images'}
				value={formState.inputValues.images}
				isValid={formState.inputValidities.images}
				inputHandler={arrayInputHandler}
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
		// padding: 20,
	},
	formControl: {
		width: '100%',
		paddingHorizontal: 20,
	},
});
