import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { Container, H1, H3, Text } from '../../ui/libUi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { List } from '../../models/List.models';
import UserAvatar from '../../components/UserAvatar';
import TaskHistoryEntry from '../../components/TaskHistoryEntry';
import { FlatList } from 'react-native-gesture-handler';
import { TaskToggleEvent } from '../../models/Task.models';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.TaskDetails>;

const TaskDetailsScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId, taskId } = route.params;
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

	const renderTaskHistoryItem = ({item}: {item: TaskToggleEvent}) => {
		const index = list.users.findIndex((user) => user.id === item.userId);
		return (
			<TaskHistoryEntry
				toggleEvent={item}
				user={list.users[index]}
				index={index}
			/>
		);
	}

	if (!task)
		return (
			<Container>
				<H1>Error</H1>
			</Container>
		);

	return (
		<Container style={styles.screen}>
			<H1>{task.title}</H1>
			<Text style={styles.description}>{task.description}</Text>
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
	description: {
		paddingBottom: 60,
	},
});
