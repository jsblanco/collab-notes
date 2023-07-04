import React, { } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './EntriesFlatlist.styles';
import { Text, colors } from '../../ui/libUi';
import { Entry } from '../../models/Entry/Entry';
import EntryItem from '../Entries/EntryItem/EntryItem';

const EntriesFlatlist = ({ listId }: { listId: string }) => {
	// const dispatch = useDispatch();
	// const navigation = useNavigation();

	// const [isLoading, setIsLoading] = useState(false);
	// const [isRefreshing, setIsRefreshing] = useState(false);

	const entries: Entry[] =useSelector((state: RootState) => state.lists.lists.find(list=>list.id===listId)?.entries) ?? [];
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

	const renderList = (entry: { item: Entry }) => (
		<EntryItem entry={entry.item} listId={listId} />
	);

	return (
		<View style={styles.screen}>
			<FlatList
				data={entries.filter((entry) => !entry.isCompleted)}
				style={{
					flex: 1,
					width: '100%',
				}}
				renderItem={renderList}
				// refreshing={isRefreshing}
				// onRefresh={loadEntries}
			/>
			<View style={{ width: '100%', height: 5, backgroundColor: 'blue' }} />
			<FlatList
				data={entries.filter((entry) => entry.isCompleted)}
				style={{
					flex: 1,
					width: '100%',
				}}
				renderItem={renderList}
				// refreshing={isRefreshing}
				// onRefresh={loadEntries}
			/>
		</View>
	);
};

export default EntriesFlatlist;
