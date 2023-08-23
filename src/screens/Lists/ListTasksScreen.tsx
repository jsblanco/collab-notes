import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { FloatingButton, Container, H3, Text } from '../../ui/libUi';
import { DragEndParams } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { changeTaskListIndex } from '../../store/lists/lists.actions';
import { Task } from '../../models/Task/Task';
import TasksFlatlist from '../../components/TasksFlatlist';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListTasks>;

const ListTaksScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;

	const error = useSelector((state: RootState) => state.lists.error);
	const { completedTasks, pendingTasks, title } = useSelector(
		(state: RootState) =>
			state.lists.lists.find((list) => list.id === listId) ?? {
				completedTasks: [],
				pendingTasks: [],
				title: 'Missing table',
			}
	);

	useEffect(() => navigation.setOptions({ title }), []);

	// const [isLoading, setIsLoading] = useState(false);
	// const [isRefreshing, setIsRefreshing] = useState(false);
	// const loadTasks = useCallback(async () => {
	// 	setIsRefreshing(true);
	// 	await dispatch(fetchListTasks.request(listId));
	// 	setIsRefreshing(false);
	// }, [dispatch]);
	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener('focus', loadTasks);
	// 	return unsubscribe();
	// }, [loadTasks]);
	// useEffect(() => {
	// 	setIsLoading(true);
	// 	loadTasks().then(() => setIsLoading(false));
	// }, [dispatch, loadTasks, listId]);
	// if (isLoading)
	// 	return (
	// 		<View style={styles.screen}>
	// 			<ActivityIndicator size={'large'} color={colors.accent} />
	// 		</View>
	// 	);
	// if (!isLoading && completedTasks.length === 0 && pendingTasks.length === 0)
	// 	return (
	// 		<View style={styles.screen}>
	// 			<Text style={{ color: colors.text.muted }}>
	// 				You have created no Tasks
	// 			</Text>
	// 		</View>
	// 	);

	if (error)
		return (
			<Container style={styles.screen}>
				<Text style={{ color: 'tomato' }}>{error}</Text>
			</Container>
		);

	return (
		<Container style={styles.screen}>
			<H3 style={styles.titles}>Pending tasks tetas</H3>
			<TasksFlatlist
				listId={listId}
				tasks={pendingTasks}
				reorderTasks
			/>
			<H3 style={styles.titles}>Completed tasks</H3>
			<TasksFlatlist
				listId={listId}
				tasks={completedTasks}
				reorderTasks
			/>
			<FloatingButton
				onPress={() =>
					navigation.navigate(ListStackRoutes.TaskForm, {
						listId,
					})
				}
			>
				New task
			</FloatingButton>
		</Container>
	);
};

export default ListTaksScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		minHeight: '100%',
		// justifyContent: 'center',
		// alignItems: 'center',
		paddingTop: 20,
		// backgroundColor: 'blue',
	},
	titles: {
		paddingHorizontal: 20,
	},
	button: {
		width: 75,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	buttonText: {
		padding: 0,
		color: '#fff',
	},

	// Draggable flatlist
	rowItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	// Draggable flatlist
	text: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
