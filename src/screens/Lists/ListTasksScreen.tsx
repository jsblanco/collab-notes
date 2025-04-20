import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import UserAvatar from '@app/components/Avatars/UserAvatar';
import CompletionBadge from '@app/components/CompletionBadge';
import EditDeleteMenu from '@app/components/EditDeleteMenu';
import TasksFlatlist from '@app/components/TasksFlatlist';
import {
	DrawerRoutes,
	ListStackProps,
	ListStackRoutes,
} from '@app/router/NavigationTypes';
import { deleteList, RootState } from '@app/store';
import {
	B,
	colors,
	Container,
	DescriptionField,
	FloatingButton,
	H3,
	Row,
	Text,
} from '@app/ui';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListTasks>;

const ListTaksScreen = ({ route, navigation }: Props): JSX.Element => {
	const dispatch = useDispatch();
	const { listId } = route.params;
	const [showCompleted, setShowCompleted] = useState<boolean>(false);
	const error = useSelector((state: RootState) => state.lists.error);
	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => list.id === listId)
	);

	const onCreateTask = () =>
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId,
			listTitle: list?.title ?? 'Unknown list',
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

	const completedFlatlist = useMemo(() => {
		if (!list) return;
		return (
			<TasksFlatlist listId={list.id} tasks={list.completedTasks} reorderTasks />
		);
	}, [list?.completedTasks]);

	const pendingFlatlist = useMemo(() => {
		if (!list) return;
		return (
			<TasksFlatlist listId={list.id} tasks={list.pendingTasks} reorderTasks />
		);
	}, [list?.pendingTasks]);

	const onEdit = () =>
		navigation.navigate(ListStackRoutes.EditList, {
			listId,
		});

	const onDelete = useCallback(() => {
		if (!list) return;
		Alert.alert(
			`Delete list "${list.title}"`,
			'Are you sure you want to delete this list for all users?\nThis cannot be undone.',
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
						navigation.navigate(DrawerRoutes.Home, {
							screen: ListStackRoutes.ListTasks,
							params: {
								listId: list.id,
							},
						});
						dispatch(deleteList.request(list.id));
					},
					style: 'destructive',
				},
			]
		);
	}, [list]);

	useEffect(
		() =>
			navigation.setOptions({
				title: list?.title ?? 'Missing list',
				headerRight: () => (
					<EditDeleteMenu label={'list'} onDelete={onDelete} onEdit={onEdit} />
				),
			}),
		[list]
	);

	if (!list || error)
		return (
			<Container style={styles.screen}>
				<Text style={styles.error}>{error}</Text>
			</Container>
		);

	return (
		<Container style={styles.screen}>
			<StatusBar backgroundColor={colors.primary} barStyle="light-content" />
			<View style={styles.card}>
				<DescriptionField style={{ marginHorizontal: 20 }}>
					{!!list.description && (
						<Text style={{ marginBottom: 15 }}>{list.description}</Text>
					)}
					<Row justifyContent={'space-between'} alignItems={'center'}>
						<Text noPadding>{list.users.length} participants</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							{list.users.slice(0, 4).map((user, i) => (
								<UserAvatar user={user} i={i} key={user?.id} overlap />
							))}
							{list.users.length > 5 && <B noPadding>+{list.users.length}</B>}
						</View>
					</Row>
				</DescriptionField>

				<Row
					style={styles.titles}
					justifyContent={'space-between'}
					alignItems={'center'}>
					<TouchableOpacity onPress={() => setShowCompleted(false)}>
						<Row alignItems={'center'}>
							<CompletionBadge muted={showCompleted} />
							<H3
								noPadding
								style={{
									paddingLeft: 20,
									...(showCompleted ? styles.mutedTitle : {}),
								}}>
								Pending
							</H3>
						</Row>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => setShowCompleted(true)}>
						<Row alignItems={'center'}>
							<H3
								noPadding
								style={{
									paddingRight: 20,
									...(!showCompleted ? styles.mutedTitle : {}),
								}}>
								Completed
							</H3>
							<CompletionBadge completed muted={!showCompleted} />
						</Row>
					</TouchableOpacity>
				</Row>
			</View>
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
	card: {
		// backgroundColor: 'red',
	},
	error: {
		color: colors.danger,
	},
	titleRow: {
		paddingHorizontal: 20,
	},
	titleIcon: {
		marginRight: 20,
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
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginBottom: 30,
	},
	mutedTitle: {
		color: colors.grey[3],
	},
});
