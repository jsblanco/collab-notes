import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import CompletionBadge from '@app/components/CompletionBadge';
import TasksFlatlist from '@app/components/TasksFlatlist';
import UserAvatar from '@app/components/UserAvatar';
import { ListStackProps, ListStackRoutes } from '@app/router/NavigationTypes';
import { RootState } from '@app/store';
import { B, colors, Container, FloatingButton, H2, Row, Text } from '@app/ui';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListTasks>;

const ListTaksScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;

	const error = useSelector((state: RootState) => state.lists.error);
	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => list.id === listId)
	);

	useEffect(
		() => navigation.setOptions({ title: list?.title ?? 'Missing list' }),
		[]
	);

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
	if (!list || error)
		return (
			<Container style={styles.screen}>
				<Text style={styles.error}>{error.message}</Text>
			</Container>
		);

	return (
		<Container style={styles.screen}>
			<Row style={styles.usersRow}>
				<Text noPadding>{list.users.length} participants</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					{list.users.slice(0, 4).map((user, i) => (
						<UserAvatar user={user} i={i} key={user?.id} overlap />
					))}
					{list.users.length > 5 && <B noPadding>+{list.users.length}</B>}
				</View>
			</Row>
			<Row style={styles.titles}>
				<H2 noPadding>Pending tasks</H2>
				<CompletionBadge isCompleted={false} />
			</Row>
			<TasksFlatlist listId={listId} tasks={list.pendingTasks} reorderTasks />
			<Row style={styles.titles}>
				<H2 noPadding>Completed tasks</H2>
				<CompletionBadge isCompleted={true} />
			</Row>
			<TasksFlatlist listId={listId} tasks={list.completedTasks} reorderTasks />
			<FloatingButton
				onPress={() =>
					navigation.navigate(ListStackRoutes.TaskForm, {
						listId,
					})
				}>
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
		paddingTop: 20,
	},
	error: { color: colors.danger },
	usersRow: {
		paddingHorizontal: 20,
		marginBottom: 30,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	userAvatar: {
		height: 40,
		width: 40,
		borderRadius: 20,
		marginRight: 5,
		overflow: 'hidden',
	},
	avatarPlaceholder: {
		marginBottom: 0,
		paddingBottom: 0,
		paddingTop: 20,
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white',
	},
	titles: {
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 5,
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
