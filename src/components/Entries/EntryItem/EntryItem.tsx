// @ts-ignore
import React from 'react';
import { View } from 'react-native';
import styles from './EntryItem.styles';
import { Entry } from '../../../models/Entry/Entry';
import { Text as Text } from '../../../ui/libUi';
import { Swipeable } from 'react-native-gesture-handler';
import EntriesRightActions from '../EntryActions/EntriesRightActions';
import EntryLeftActions from '../EntryActions/EntryLeftActions';
import { useDispatch } from 'react-redux';
import {
	removeListEntry,
	toggleEntryCompletion,
} from '../../../store/lists/lists.actions';

interface Props {
	entry: Entry;
	listId: string;
}

const EntryItem = ({ entry, listId }: Props) => {
	const dispatch = useDispatch();
	const onDelete = () => dispatch(removeListEntry.request(listId, entry.id));
	const onToggle = () =>
		dispatch(toggleEntryCompletion.request(listId, entry.id));
	return (
		<Swipeable
			onSwipeableWillOpen={(d) => d === 'left' && setTimeout(onToggle, 100)}
			renderLeftActions={(p, d) => (
				<EntryLeftActions
					isCompleted={!!entry.isCompleted}
					progress={p}
					dragX={d}
				/>
			)}
			renderRightActions={() => <EntriesRightActions onDelete={onDelete} />}
		>
			<View style={styles.screen}>
				<Text>{entry.title}</Text>
			</View>
		</Swipeable>
	);
};

export default EntryItem;
