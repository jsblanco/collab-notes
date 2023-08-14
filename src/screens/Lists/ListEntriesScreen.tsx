import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import EntriesFlatlist from '../../components/EntriesFlatlist';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { FloatingButton, Container } from '../../ui/libUi';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListEntries>;

const ListEntriesScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;

	return (
		<Container style={styles.screen}>
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
		</Container>
	);
};

export default ListEntriesScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
	},
});
