import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './EntriesFlatlist.styles';
import { H2, Text } from '../../ui/libUi';
import { Entry } from '../../models/Entry/Entry';
import DraggableFlatList, {
	DragEndParams,
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { AlternativeEntryItem } from '../Entries/AlternativeEntryItem';
import { changeEntryListIndex } from '../../store/lists/lists.actions';

const EntriesFlatlist = ({ listId }: { listId: string }) => {
	const dispatch = useDispatch();

	// const navigation = useNavigation();

	// const [isLoading, setIsLoading] = useState(false);
	// const [isRefreshing, setIsRefreshing] = useState(false);

	// const completedEntries: Entry[] = useSelector((state: RootState) =>
	// 	state.lists.lists.find((list) => list.id === listId)?.completedEntries ?? []
	// );
	// const pendingEntries: Entry[] = useSelector((state: RootState) =>
	// 	state.lists.lists.find((list) => list.id === listId)?.pendingEntries ?? []
	// );

	const { completedEntries, pendingEntries } = useSelector(
		(state: RootState) =>
			state.lists.lists.find((list) => list.id === listId) ?? {
				completedEntries: [],
				pendingEntries: [],
			}
	);

	const error = useSelector((state: RootState) => state.lists.error);

	// const loadEntries = useCallback(async () => {
	// 	setIsRefreshing(true);
	// 	await dispatch(fetchListEntries.request(listId));
	// 	setIsRefreshing(false);
	// }, [dispatch]);

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener('focus', loadEntries);
	// 	return unsubscribe();
	// }, [loadEntries]);

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	loadEntries().then(() => setIsLoading(false));
	// }, [dispatch, loadEntries, listId]);

	if (error)
		return (
			<View style={styles.screen}>
				<Text style={{ color: 'tomato' }}>{error}</Text>
			</View>
		);

	// if (isLoading)
	// 	return (
	// 		<View style={styles.screen}>
	// 			<ActivityIndicator size={'large'} color={colors.accent} />
	// 		</View>
	// 	);
	// if (!isLoading && entries.length === 0)
	// 	return (
	// 		<View style={styles.screen}>
	// 			<Text style={{ color: colors.text.muted }}>
	// 				You have created no entries
	// 			</Text>
	// 		</View>
	// 	);

	const renderItem = useCallback((params: RenderItemParams<Entry>) => (
			<AlternativeEntryItem
				{...params}
				listId={listId}
				entry={params.item}
			/>
		), []);

	const changeTaskOrder = ({ data, from, to }: DragEndParams<Entry>) => {
		dispatch(
			changeEntryListIndex.request(
				listId,
				data.map((entry) => entry.id)
			)
		);
	};

	return (
		<View style={styles.screen}>
			<H2 center>Pending tasks</H2>
			<DraggableFlatList
				containerStyle={{ flex: 1 }}
				style={{ flex: 1 }}
				data={pendingEntries ?? []}
				onDragEnd={changeTaskOrder}
				keyExtractor={(item) => item.id}
				activationDistance={10}
				renderItem={renderItem}
			/>
			<H2 center>Completed tasks</H2>
			<DraggableFlatList
				containerStyle={{ flex: 1 }}
				style={{ flex: 1 }}
				data={completedEntries ?? []}
				onDragEnd={changeTaskOrder}
				keyExtractor={(item) => item.id}
				activationDistance={10}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default EntriesFlatlist;
