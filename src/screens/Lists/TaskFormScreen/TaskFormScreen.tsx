import FormControl from "@app/components/FormControl/FormControl";
import ImageSelector from "@app/components/ImageSelector/ImageSelector";
import RadioInput from "@app/components/RadioInput/RadioInput";
import { Periodicity } from "@app/models";
import type { DbImage } from "@app/models/DbImage.models";
import type {
	ListStackProps,
	ListStackRoutes,
} from "@app/router/stacks/ListStack.types";
import { addListTask, type RootState } from "@app/store";
import { Button, Card, Container, colors, extraShadow, H2 } from "@app/ui";
import type { StackScreenProps } from "@react-navigation/stack";
import { useCallback, useEffect, useReducer } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	Actions,
	formReducer,
	type TaskFormKeys,
} from "./TaskFormScreen.reducer";

type Props = StackScreenProps<ListStackProps, ListStackRoutes.TaskForm>;

const TaskFormScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId, listTitle, taskId } = route.params;
	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => listId === list.id),
	) ?? { pendingTasks: [], completedTasks: [] };

	const task = [...list.pendingTasks, ...list.completedTasks].find(
		(task) => task.id === taskId,
	);

	const initialFormState = {
		inputValues: {
			title: task?.title ?? "",
			images: task?.images ?? [],
			description: task?.description ?? "",
			periodicity: task?.periodicity ?? Periodicity.MANUAL,
		},
		inputValidities: {
			images: true,
			periodicity: true,
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
				title: listTitle,
			}),
		[navigation.setOptions, listTitle],
	);

	const onSubmit = () => {
		if (formState.formIsValid)
			dispatch(
				addListTask.request(listId, {
					listId,
					history: [],
					...task,
					...formState.inputValues,
				}),
			);
		//@ts-ignore
		navigation.goBack();
	};

	const inputHandler = useCallback(
		(key: string, value: string, isValid: boolean) => {
			if (["title, description, periodicity"].includes(key))
				formDispatch({
					type: Actions.FORM_UPDATE,
					value: value,
					isValid: isValid,
					input: key as Exclude<TaskFormKeys, "images">,
				});
		},
		[],
	);

	const arrayInputHandler = useCallback(
		(key: string, value: DbImage[] = [], isValid: boolean) => {
			if (key === "images")
				formDispatch({
					type: Actions.FORM_ARRAY_UPDATE,
					value: value,
					isValid: isValid,
					input: key,
				});
		},
		[],
	);

	// const onReset = useCallback(() => {
	// 	formDispatch({
	// 		type: Actions.FORM_RESET,
	// 		value: initialFormState,
	// 	});
	// }, [initialFormState]);

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.select({ ios: "padding", android: undefined })}
		>
			<StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<Container style={styles.screen}>
					<Card style={styles.card}>
						<H2>{task ? `Edit task "${task.title}"` : "Create new task"}</H2>
						<FormControl
							label={"Name"}
							value={formState.inputValues.title}
							isValid={formState.inputValidities.title}
							inputName={"title"}
							placeholder={"Task name"}
							inputHandler={inputHandler}
							minLength={3}
							maxLength={30}
							required
						/>
						<FormControl
							label={"Description"}
							inputName={"description"}
							placeholder={"Task description"}
							value={formState.inputValues.description}
							isValid={formState.inputValidities.description}
							inputHandler={inputHandler}
							numberOfLines={4}
							maxLength={300}
							multiline
							required
						/>
					</Card>
					<ImageSelector
						label={"Add image"}
						inputName={"images"}
						maxAmount={5}
						value={formState.inputValues.images}
						isValid={formState.inputValidities.images}
						inputHandler={arrayInputHandler}
					/>
					<Card style={styles.card}>
						<RadioInput
							label={"Automatically set as 'Pending'..."}
							tooltip={
								"How often should this task be automatically set as Pending, if at all?"
							}
							inputName={"periodicity"}
							inputHandler={inputHandler}
							value={formState.inputValues.periodicity}
							isValid={formState.inputValidities.periodicity}
							options={[
								{ id: Periodicity.DAILY, label: "Daily" },
								{ id: Periodicity.WEEKLY, label: "Weekly" },
								{ id: Periodicity.MONTHLY, label: "Monthly" },
								{ id: Periodicity.MANUAL, label: "I'll toggle it myself" },
							]}
						/>
					</Card>

					{/* <FloatingButton disabled={!formState.formIsValid} onPress={onSubmit}>
						{task ? 'Update task' : 'Create new task'}
					</FloatingButton> */}
				</Container>
			</ScrollView>

			<View style={styles.submitButton}>
				<Button onPress={onSubmit} disabled={!formState.formIsValid}>
					{task ? "Update task" : "Create new task"}
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
};

export default TaskFormScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: "100%",
		position: "relative",
	},
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingVertical: 10,
		paddingBottom: 100,
	},
	card: {
		marginHorizontal: 14,
		marginVertical: 10,
	},
	submitButton: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 16,
		paddingBottom: 32,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#ddd",
		...extraShadow,
	},
});
