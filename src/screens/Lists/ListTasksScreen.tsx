import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import CompletionBadge from '@app/components/CompletionBadge';
import TasksFlatlist from '@app/components/TasksFlatlist';
import UserAvatar from '@app/components/UserAvatar';
import { ListStackProps, ListStackRoutes } from '@app/router/NavigationTypes';
import { RootState } from '@app/store';
import {
	B,
	colors,
	Container,
	FloatingButton,
	H2,
	H3,
	Row,
	Text,
} from '@app/ui';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListTasks>;

const ListTaksScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;
	const [showCompleted, setShowCompleted] = useState<boolean>(false);
	const error = useSelector((state: RootState) => state.lists.error);
	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => list.id === listId)
	);

	useEffect(
		() => navigation.setOptions({ title: list?.title ?? 'Missing list' }),
		[]
	);

	const onCreateTask = () =>
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId,
		});

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
				<Text style={styles.error}>{error}</Text>
			</Container>
		);

	const completedFlatlist = useMemo(
		() => (
			<TasksFlatlist listId={list.id} tasks={list.completedTasks} reorderTasks />
		),
		[list]
	);

	const pendingFlatlist = useMemo(
		() => (
			<TasksFlatlist listId={list.id} tasks={list.pendingTasks} reorderTasks />
		),
		[list.pendingTasks.length]
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
				<TouchableOpacity onPress={() => setShowCompleted(false)}>
					<Row style={{ alignItems: 'center' }}>
						<CompletionBadge muted={showCompleted} />
						<H3 style={showCompleted ? styles.mutedTitle : {}} noPadding>
							Pending
						</H3>
					</Row>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setShowCompleted(true)}>
					<Row style={{ alignItems: 'center' }}>
						<H3 style={!showCompleted ? styles.mutedTitle : {}} noPadding>
							Completed
						</H3>
						<CompletionBadge completed muted={!showCompleted} />
					</Row>
				</TouchableOpacity>
			</Row>
			{showCompleted ? completedFlatlist : pendingFlatlist}
			<FloatingButton onPress={onCreateTask}>New task</FloatingButton>
		</Container>
	);
};

export default ListTaksScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
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
		marginBottom: 30,
	},
	mutedTitle: {
		color: colors.grey[3],
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
