import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import CompletionBadge from '@app/components/CompletionBadge';
import ImageGallery from '@app/components/ImageGallery';
import TaskHistoryEntry from '@app/components/TaskHistoryEntry';
import { List, TaskToggleEvent } from '@app/models';
import {
	getDrawerListLink,
	ListStackProps,
	ListStackRoutes,
} from '@app/router/NavigationTypes';
import { removeListTask, RootState, toggleTaskCompletion } from '@app/store';
import { Button, colors, Container, H1, H3, Row, Text } from '@app/ui';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.TaskDetails>;

const TaskDetailsScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId, taskId } = route.params;
	const dispatch = useDispatch();
	const list: List | undefined = useSelector((state: RootState) =>
		state.lists.lists.find((list) => list.id === listId)
	);

	if (!list)
		return (
			<Container>
				<H1>Error</H1>
			</Container>
		);

	const task = [...list.pendingTasks, ...list.completedTasks].find(
		(task) => task.id === taskId
	);

	const renderTaskHistoryItem = ({ item }: { item: TaskToggleEvent }) => {
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
	}, [task]);

	const onDeleteTask = useCallback(() => {
		if (!task) return;
		Alert.alert(
			`Delete task "${task.title}"`,
			'Are you sure you want to delete this task from this list for all users?\nThis cannot be undone.',
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Delete',
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
					style: 'destructive',
				},
			]
		);
	}, [task]);

	const onEdit = useCallback(() => {
		if (!task) return;
		//@ts-ignore
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId: task.listId,
			taskId: task.id,
		});
	}, [navigation]);

	if (!task)
		return (
			<Container>
				<H1>Error</H1>
			</Container>
		);

	return (
		<Container>
			<FlatList
				data={task.history}
				style={styles.screen}
				renderItem={renderTaskHistoryItem}
				ListHeaderComponent={
					<>
						<Row style={styles.titleRow}>
							<CompletionBadge completed={!!task.isCompleted} />
							<H1 style={styles.title} noPadding>
								{task.title}
							</H1>
						</Row>

						<View style={[styles.section, styles.description]}>
							<Text>{task.description}</Text>
						</View>
						{task.images.length > 0 && <ImageGallery images={task.images} />}
						<View style={[styles.section]}>
							{task.isCompleted ? (
								<Button buttonStyle={styles.yellowText} onPress={onToggleTask}>
									Mark as pending
								</Button>
							) : (
								<Button buttonStyle={styles.greenText} onPress={onToggleTask}>
									Mark as completed
								</Button>
							)}
							<Row style={styles.buttonsRow}>
								<Button
									fullWidth
									buttonStyle={styles.deleteButton}
									onPress={onDeleteTask}>
									Delete task
								</Button>
								<Button fullWidth buttonStyle={styles.editButton} onPress={onEdit}>
									Edit task
								</Button>
							</Row>
						</View>
						<H3 style={styles.historyTitle}>Task history</H3>
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
		width: '100%',
		paddingTop: 20,
	},
	titleRow: {
		marginBottom: 32,
		marginHorizontal: 10,
		alignItems: 'center',
	},
	title: {
		marginBottom: 0,
		paddingTop: 10,
		paddingRight: 50,
	},
	section: {
		marginBottom: 30,
		marginHorizontal: 20,
	},

	description: {
		padding: 20,
		paddingBottom: 25,
		marginBottom: 20,
		backgroundColor: colors.grey[5],
		borderRadius: 10,
		alignContent: 'flex-start',
	},
	greenText: {
		backgroundColor: colors.completed,
	},
	yellowText: {
		backgroundColor: colors.pending,
	},
	completionToggleSection: {
		alignItems: 'center',
	},
	buttonsRow: {
		justifyContent: 'space-between',
	},
	editButton: {
		backgroundColor: colors.general.blue,
	},
	deleteButton: {
		backgroundColor: colors.general.red,
	},
	historyTitle: {
		paddingHorizontal: 20,
	},
});
