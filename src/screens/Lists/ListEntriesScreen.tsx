import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import EntriesFlatlist from '../../components/EntriesFlatlist';
import {
	ListStackProps,
	ListStackRoutes,
	DrawerStackRoutes,
} from '../../navigation/NavigationTypes';
import { H1, FloatingButton } from '../../ui/libUi';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListEntries>;

const ListEntriesScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;

	return (
		<View style={styles.screen}>
			<EntriesFlatlist listId={listId} />
			<FloatingButton
				onPress={() =>
					//@ts-ignore
					navigation.navigate(ListStackRoutes.EntryForm, {
						listId,
					})
				}
			>
				Add entry
			</FloatingButton>
		</View>
	);
};

export default ListEntriesScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
