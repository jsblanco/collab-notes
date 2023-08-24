import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { Container, H1, Text } from '../../ui/libUi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { List } from '../../models/List.models';

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

	if (!task)
		return (
			<Container>
				<H1>Error</H1>
			</Container>
		);

	return (
		<Container style={styles.screen}>
			<H1>{task.title}</H1>
			<Text>{task.description}</Text>
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
});
