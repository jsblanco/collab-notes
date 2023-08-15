import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { H3, Text } from '../ui/libUi';
import { Task } from '../models/Task/Task';
import DraggableFlatList, {
	DragEndParams,
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { TaskItem } from './TaskItem';
import { changeTaskListIndex } from '../store/lists/lists.actions';
import { useNavigation } from '@react-navigation/native';

const TasksFlatlist = ({ listId }: { listId: string }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	// const navigation = useNavigation();

	// const [isLoading, setIsLoading] = useState(false);
	// const [isRefreshing, setIsRefreshing] = useState(false);

	// const completedETasks: task[] = useSelector((state: RootState) =>
	// 	state.lists.lists.find((list) => list.id === listId)?.completedETasks ?? []
	// );
	// const pendingETasks: task[] = useSelector((state: RootState) =>
	// 	state.lists.lists.find((list) => list.id === listId)?.pendingETasks ?? []
	// );

	const { completedTasks, pendingTasks, title } = useSelector(
		(state: RootState) =>
			state.lists.lists.find((list) => list.id === listId) ?? {
				completedTasks: [],
				pendingTasks: [],
				title: 'Missing table',
			}
	);

	useEffect(() => navigation.setOptions({ title }), []);

	const error = useSelector((state: RootState) => state.lists.error);

	// const loadETasks = useCallback(async () => {
	// 	setIsRefreshing(true);
	// 	await dispatch(fetchListETasks.request(listId));
	// 	setIsRefreshing(false);
	// }, [dispatch]);

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener('focus', loadETasks);
	// 	return unsubscribe();
	// }, [loadETasks]);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	loadETasks().then(() => setIsLoading(false));
	// }, [dispatch, loadETasks, listId]);

	// if (isLoading)
	// 	return (
	// 		<View style={styles.screen}>
	// 			<ActivityIndicator size={'large'} color={colors.accent} />
	// 		</View>
	// 	);
	// if (!isLoading && eTasks.length === 0)
	// 	return (
	// 		<View style={styles.screen}>
	// 			<Text style={{ color: colors.text.muted }}>
	// 				You have created no eTasks
	// 			</Text>
	// 		</View>
	// 	);

	const renderItem = useCallback(
		(params: RenderItemParams<Task>) => (
			<TaskItem {...params} listId={listId} task={params.item} />
		),
		[]
	);

	const changeTaskOrder = useCallback(
		({ data, from, to }: DragEndParams<Task>) => {
			dispatch(
				changeTaskListIndex.request(
					listId,
					data.map((task) => task.id)
				)
			);
		},
		[dispatch, listId]
	);

	if (error)
		return (
			<View style={styles.screen}>
				<Text style={{ color: 'tomato' }}>{error}</Text>
			</View>
		);

	return (
		<View style={styles.screen}>
			<H3 style={styles.titles}>Pending tasks</H3>
			<DraggableFlatList
				// containerStyle={{ flex: 1 }}
				style={{ paddingBottom: 60 }}
				data={pendingTasks ?? []}
				onDragEnd={changeTaskOrder}
				keyExtractor={(item) => item.id}
				activationDistance={10}
				renderItem={renderItem}
			/>
			<H3 style={styles.titles}>Completed tasks</H3>
			<DraggableFlatList
				// containerStyle={{ flex: 1 }}
				// style={{ flex: 1 }}
				data={completedTasks ?? []}
				onDragEnd={changeTaskOrder}
				keyExtractor={(item) => item.id}
				activationDistance={10}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default TasksFlatlist;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		minHeight: '100%',
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
