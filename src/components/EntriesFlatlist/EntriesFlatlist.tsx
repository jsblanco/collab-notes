import React, { useCallback, useRef } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './EntriesFlatlist.styles';
import { Text, colors } from '../../ui/libUi';
import { Entry } from '../../models/Entry/Entry';
import EntryItem from '../Entries/EntryItem/EntryItem';
import DraggableFlatList, {
	RenderItemParams,
	ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { AlternativeEntryItem } from '../Entries/AlternativeEntryItem';

const EntriesFlatlist = ({ listId }: { listId: string }) => {
	// const dispatch = useDispatch();
	// const navigation = useNavigation();

	// const [isLoading, setIsLoading] = useState(false);
	// const [isRefreshing, setIsRefreshing] = useState(false);

	const entries: Entry[] =
		useSelector(
			(state: RootState) =>
				state.lists.lists.find((list) => list.id === listId)?.entries
		) ?? [];
	const error = useSelector((state: RootState) => state.lists.error);
	const itemRefs = useRef(new Map());

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

	const renderList = (entry: { item: Entry }) => (
		<EntryItem entry={entry.item} listId={listId} />
	);

	// const renderItem = ({ item, drag, isActive }: RenderItemParams<Entry>) => {
	// 	return (
	// 		<ScaleDecorator>
	// 			<TouchableOpacity
	// 				activeOpacity={1}
	// 				onLongPress={drag}
	// 				disabled={isActive}
	// 				style={[
	// 					styles.rowItem,
	// 					{ borderWidth: 3, borderColor: isActive ? 'red' : 'white' },
	// 				]}
	// 			>
	// 				<EntryItem entry={item} listId={listId} />
	// 			</TouchableOpacity>
	// 		</ScaleDecorator>
	// 	);
	// };

	const renderItem = useCallback((params: RenderItemParams<Entry>) => {
		const onPressDelete = () => {
			console.log(params);
		};

		return (
			<AlternativeEntryItem
				{...params}
				entry={params.item}
				itemRefs={itemRefs}
				onPressDelete={onPressDelete}
			/>
		);
	}, []);

	return (
		<View style={styles.screen}>
			<DraggableFlatList
				containerStyle={{ flex: 1 }}
				style={{ flex: 1 }}
				data={entries.filter((entry) => !entry.isCompleted)}
				onDragEnd={({ data }) => console.log(data)}
				keyExtractor={(item) => item.id}
				activationDistance={20}
				renderItem={renderItem}
			/>
			<View style={{ width: '100%', height: 5, backgroundColor: 'blue' }} />
			<DraggableFlatList
				containerStyle={{ flex: 1 }}
				style={{ flex: 1 }}
				data={entries.filter((entry) => entry.isCompleted)}
				onDragEnd={({ data }) => console.log(data)}
				keyExtractor={(item) => item.id}
				activationDistance={20}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default EntriesFlatlist;
