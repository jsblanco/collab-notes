import React from 'react';
import { View } from 'react-native';
import styles from './ListsScreen.styles';
import { StackScreenProps } from '@react-navigation/stack';
import { List } from '../../../models/List/List';
import ListsFlatlist from '../../../components/ListsFlatlist/ListsFlatlist';
import {ListStackProps, ListStackRoutes } from '../../../navigation/NavigationTypes';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListsHome>;

const ListsScreen = ({ route, navigation }: Props) => {
	const navigateToList = (list: List) =>
		navigation.navigate(ListStackRoutes.ListEntries, { listId: list.id });

	return (
		<View style={styles.screen}>
			<ListsFlatlist listAction={navigateToList} />
		</View>
	);
};

export default ListsScreen;
