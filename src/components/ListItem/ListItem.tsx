import React from 'react';
import { Pressable } from 'react-native';
import { Text } from '../../ui/libUi';
import { List } from '../../models/List/List';
import styles from './ListItem.styles';

const ListItem = ({
	list,
	listAction,
}: {
	list: List;
	listAction: (e?: any) => any;
}) => {
	return (
		<Pressable style={styles.screen} onPress={listAction}>
			<Text>{list.title}</Text>
		</Pressable>
	);
};

export default ListItem;
