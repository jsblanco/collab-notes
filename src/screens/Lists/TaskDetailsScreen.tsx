import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import CompletionBadge from '@app/components/CompletionBadge';
import TaskHistoryEntry from '@app/components/TaskHistoryEntry';
import { List, TaskToggleEvent } from '@app/models';
import { ListStackProps, ListStackRoutes } from '@app/router/NavigationTypes';
import { RootState, toggleTaskCompletion } from '@app/store';
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

	if (!task)
		return (
			<Container>
				<H1>Error</H1>
			</Container>
		);

	const onToggleTask = useCallback(() => {
		dispatch(toggleTaskCompletion.request(task.listId, task.id));
	}, [task]);

	return (
		<Container style={styles.screen}>
			<Row style={styles.titleRow}>
				<CompletionBadge completed={!!task.isCompleted} />
				<H1 style={styles.title} noPadding>
					{task.title}
				</H1>
			</Row>
			<View style={[styles.section]}>
				<View style={[styles.section, styles.description]}>
					<Text>{task.description}</Text>
				</View>
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
				</View>
			</View>

			<H3>Task history</H3>
			<FlatList data={task.history} renderItem={renderTaskHistoryItem} />
		</Container>
	);
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		alignItems: 'flex-start',
		padding: 20,
	},
	titleRow: {
		marginBottom: 32,
		alignItems: 'center',
	},
	title: {
		marginBottom: 0,
		paddingTop: 10,
		paddingRight: 50,
	},
	section: {
		marginBottom: 30,
		width: '100%',
	},
	description: {
		padding: 20,
		paddingBottom: 25,
		width: '100%',
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
});
