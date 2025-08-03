import CompletionBadge from "@app/components/CompletionBadge";
import EditDeleteMenu from "@app/components/EditDeleteMenu";
import ImageGallery from "@app/components/ImageGallery";
import PeriodicityBadge from "@app/components/PeriodicityBadge";
import TaskHistoryEntry from "@app/components/TaskHistoryEntry";
import type { List, TaskToggleEvent } from "@app/models";
import { getDrawerListLink } from "@app/router/drawer/DrawerNavigation.types";
import {
	type ListStackProps,
	ListStackRoutes,
} from "@app/router/stacks/ListStack.types";
import {
	type RootState,
	removeListTask,
	toggleTaskCompletion,
} from "@app/store";
import {
	Button,
	Card,
	Container,
	colors,
	DescriptionField,
	H1,
	H3,
	Row,
	shadow,
	Text,
} from "@app/ui";
import type { StackScreenProps } from "@react-navigation/stack";
import { useCallback, useEffect } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

type Props = StackScreenProps<ListStackProps, ListStackRoutes.TaskDetails>;

const TaskDetailsScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId, taskId } = route.params;
	const dispatch = useDispatch();
	const list: List | undefined = useSelector((state: RootState) =>
		state.lists.lists.find((list) => list.id === listId),
	);

	const task = list
		? [...list.pendingTasks, ...list.completedTasks].find(
				(task) => task.id === taskId,
			)
		: undefined;

	const renderTaskHistoryItem = ({ item }: { item: TaskToggleEvent }) => {
		if (!list) return null;

		const index = list.users.findIndex((user) => user.id === item.userId);
		return (
			<TaskHistoryEntry
				toggleEvent={item}
				user={list.users[index]}
				index={index}
			/>
		);
	};

	const onToggleTask = useCallback(() => {
		if (!task) return;
		dispatch(toggleTaskCompletion.request(task.listId, task.id));
	}, [task, dispatch]);

	const onDelete = useCallback(() => {
		if (!task) return;
		Alert.alert(
			`Delete task "${task.title}"`,
			"Are you sure you want to delete this task from this list for all users?\nThis cannot be undone.",
			[
				{
					text: "Cancel",
					onPress: () => {},
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => {
						//@ts-ignore
						navigation.navigate(getDrawerListLink(task.listId), {
							screen: ListStackRoutes.ListTasks,
							params: {
								listId: task.listId,
							},
						});
						dispatch(removeListTask.request(task.listId, task.id));
					},
					style: "destructive",
				},
			],
		);
	}, [task, dispatch, navigation.navigate]);

	const onEdit = useCallback(() => {
		if (!task) return;
		//@ts-ignore
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId: task.listId,
			listTitle: list?.title ?? "Unknown list",
			taskId: task.id,
		});
	}, [navigation, list, task]);

	useEffect(
		() =>
			navigation.setOptions({
				title: list?.title ?? "Missing task",
				headerTintColor: colors.grey[1],
				headerTitleStyle: {
					color: colors.grey[1],
				},
				headerStyle: {
					backgroundColor: task?.isCompleted
						? colors.completed
						: colors.pending,
				},
				headerRight: () => (
					<EditDeleteMenu label={"task"} onDelete={onDelete} onEdit={onEdit} />
				),
			}),
		[task, list, navigation.setOptions, onDelete, onEdit],
	);

	return !list || !task ? (
		<Container>
			<H1>Error</H1>
		</Container>
	) : (
		<Container>
			<StatusBar
				backgroundColor={task?.isCompleted ? colors.completed : colors.pending}
				barStyle="dark-content"
			/>
			<FlatList
				data={task.history}
				style={styles.screen}
				contentContainerStyle={styles.contentContainer}
				renderItem={renderTaskHistoryItem}
				ListFooterComponent={<View style={styles.historyFooter} />}
				ListHeaderComponent={
					<>
						<Card>
							<H1 style={styles.title} noPadding>
								{task.title}
							</H1>
							<DescriptionField style={styles.section}>
								<Text>{task.description}</Text>
								<Row alignItems="center">
									<CompletionBadge
										completed={!!task.isCompleted}
										tooltip
										alignLeft
									/>
									<View style={{ paddingLeft: 10 }}>
										<PeriodicityBadge
											periodicity={task.periodicity}
											tooltip
											alignLeft
										/>
									</View>
								</Row>
							</DescriptionField>
							{task.images.length > 0 && <ImageGallery images={task.images} />}
							<View style={[styles.section]}>
								{task.isCompleted ? (
									<Button
										buttonStyle={styles.yellowText}
										onPress={onToggleTask}
									>
										Mark as pending
									</Button>
								) : (
									<Button buttonStyle={styles.greenText} onPress={onToggleTask}>
										Mark as completed
									</Button>
								)}
							</View>
						</Card>
						<View style={styles.historyHeader}>
							<H3 style={styles.historyTitle}>Task history</H3>
						</View>
					</>
				}
			/>
		</Container>
	);
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: "100%",
		paddingTop: 10,
	},
	contentContainer: {
		paddingBottom: 50,
	},
	title: {
		textAlign: "center",
		marginBottom: 0,
		paddingTop: 10,
	},
	section: {
		marginBottom: 20,
	},

	greenText: {
		backgroundColor: colors.completed,
	},
	yellowText: {
		backgroundColor: colors.pending,
	},
	completionToggleSection: {
		alignItems: "center",
	},
	historyHeader: {
		backgroundColor: "white",
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		paddingTop: 10,
		marginHorizontal: 10,
		parginBottom: -1,
		borderColor: "white",
		borderBottomWidth: 1,
		...shadow,
	},
	historyTitle: {
		paddingHorizontal: 20,
	},
	historyFooter: {
		padding: 10,
		marginHorizontal: 10,
		backgroundColor: "white",
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 15,
		...shadow,
	},
	daily: {
		color: colors.general.darkBlue,
	},
	weekly: {
		color: colors.accent,
	},
	monthly: {
		color: colors.general.green,
	},
});
