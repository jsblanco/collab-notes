// @ts-ignore
import Swipeable from 'react-native-swipeable-row';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import styles from './EntryItem.styles';
import { Entry } from '../../models/Entry/Entry';
import { Text as Text } from '../../ui/libUi';

const EntryItem = ({
	entry,
	action,
}: {
	entry: Entry;
	action: (e: any) => any;
}) => {
	return (
		<View style={styles.screen}>
			<Text>{entry.title}</Text>
		</View>
	);
};

export default EntryItem;
