import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { Button, Container, H1, H3, Row, Text, colors } from '../../ui/libUi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { List } from '../../models/List.models';
import TaskHistoryEntry from '../../components/TaskHistoryEntry';
import { FlatList } from 'react-native-gesture-handler';
import { TaskToggleEvent } from '../../models/Task.models';
import CompletionBadge from '../../components/CompletionBadge';
import { toggleTaskCompletion } from '../../store/lists/lists.actions';

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
			<Row style={{ marginBottom: 32, alignItems: 'center' }}>
				<CompletionBadge isCompleted={!!task.isCompleted} />
				<H1 style={{ marginBottom: 0, paddingTop: 10 }} noPadding>
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
		fontWeight: '900',
	},
	yellowText: {
		backgroundColor: colors.pending,
	},
	completionToggleSection: {
		alignItems: 'center',
	},
});
