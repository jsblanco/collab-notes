import React from 'react';
import { View } from 'react-native';
import styles from './ListEntriesScreen.styles';

import { StackScreenProps } from '@react-navigation/stack';
import EntriesFlatlist from '../../../components/EntriesFlatlist/EntriesFlatlist';
import { ListStackProps, ListStackRoutes } from '../../../navigation/NavigationTypes';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListEntries>;

const ListEntriesScreen = ({ route, navigation }: Props): JSX.Element => {

	return (
		<View style={styles.screen}>
			<EntriesFlatlist listId={route.params.listId} />
		</View>
	);
};

export default ListEntriesScreen;
