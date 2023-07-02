import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
	fetchListEntries,
	removeListEntry,
} from '../../store/entries/entries.actions';
import { RootState } from '../../store/store';
import styles from './EntriesFlatlist.styles';
import EntryItem from '../EntryItem/EntryItem';
import { Button, H3, Text, colors } from '../../ui/libUi';
import SwipeableRow from '../SwipableRow/SwipableRow';
import { Entry } from '../../models/Entry/Entry';
import { DummyEntries } from '../../../data/DummyData';

const EntriesFlatlist = ({ listId }: { listId: string }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// const [entries, setEntries] = useState([...DummyEntries]); //
	const entries = useSelector((state: RootState) => state.entries.entries);
	const error = useSelector((state: RootState) => state.entries.error);

	const loadCategories = useCallback(async () => {
		setIsRefreshing(true);
		await dispatch(fetchListEntries.request(listId));
		setIsRefreshing(false);
	}, [dispatch]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', loadCategories);
		return unsubscribe();
	}, [loadCategories]);

	useEffect(() => {
		setIsLoading(true);
		loadCategories().then(() => setIsLoading(false));
	}, [dispatch, loadCategories]);

	if (error)
		return (
			<View style={styles.screen}>
				<Text style={{ color: 'tomato' }}>{error}</Text>
			</View>
		);
	if (isLoading)
		return (
			<View style={styles.screen}>
				<ActivityIndicator size={'large'} color={colors.accent} />
			</View>
		);
	if (!isLoading && entries.length === 0)
		return (
			<View style={styles.screen}>
				<Text style={{ color: colors.text.muted }}>
					You have created no products
				</Text>
			</View>
		);

	const deleteEntry = (entryId: string) =>
		dispatch(removeListEntry.request(listId, entryId));

	const renderList = (entry: { item: Entry }) => (
		// <View style={styles.screen}>
		// 	<H3>{entry.item.title}</H3>
		// 	<Text>{entry.item.description}</Text>
		// 	<Button
		// 		onPress={
		// 			// () =>setEntries((entryId) =>							entries.filter((e) => e.id !== entry.item.id)						)
		// 			()=> {dispatch(
		// 				// fetchListEntries.request(listId)
		// 				removeListEntry.request(listId, entry.item.id)
		// 				)}
		// 		}
		// 	>
		// 		Delete
		// 	</Button>
		// </View>

		<SwipeableRow
			onDelete={() => dispatch(removeListEntry.request(listId, entry.item.id))}
			height={100}
		>
			<EntryItem entry={entry.item} action={(e) => console.log(e)} />
		</SwipeableRow>
	);

	return (
		<View>
			<FlatList
				data={entries}
				style={{
					flex: 1,
					width: '100%',
				}}
				renderItem={renderList}
				refreshing={isRefreshing}
				onRefresh={loadCategories}
			/>
		</View>

		// <SwipeListView
		// 	data={entries}
		// 	style={styles.screen}
		// 	renderItem={renderList}
		// 	renderHiddenItem={(data, rowMap) => (
		// 		<View
		// 			style={{
		// 				justifyContent: 'space-between',
		// 				flexDirection: 'row',
		// 				flex: 1,
		// 				alignItems: 'center',
		// 			}}
		// 		>
		// 			<View style={styles.button}>
		// 				<Text style={styles.buttonText}>Left</Text>
		// 			</View>
		// 			<View style={styles.button}>
		// 				<Text style={styles.buttonText}>Right</Text>
		// 			</View>
		// 		</View>
		// 	)}
		// 	leftOpenValue={75}
		// 	rightOpenValue={-75}
		// 	refreshing={isRefreshing}
		// 	onRefresh={loadCategories}
		// />
	);
};

export default EntriesFlatlist;
