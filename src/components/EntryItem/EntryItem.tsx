// @ts-ignore
import React from 'react';
import { View } from 'react-native';
import styles from './EntryItem.styles';
import { Entry } from '../../models/Entry/Entry';
import { Text as Text } from '../../ui/libUi';
import { Swipeable } from 'react-native-gesture-handler';
import EntriesRightActions from '../Entries/EntriesRightActions';
import EntryLeftActions from '../Entries/EntryLeftActions';

interface Props {
	entry: Entry;
	onDelete: () => void;
}

const EntryItem = ({ entry, onDelete }: Props) => {
	return (
		<Swipeable
			// onSwipeableWillOpen={(d) => d === 'left' && setTimeout(onDelete, 1000)}
			renderLeftActions={(p, d) => <EntryLeftActions progress={p} dragX={d} />}
			renderRightActions={() => <EntriesRightActions onDelete={onDelete} />}
		>
			<View style={styles.screen}>
				<Text>{entry.title}</Text>
			</View>
		</Swipeable>
	);
};

export default EntryItem;
