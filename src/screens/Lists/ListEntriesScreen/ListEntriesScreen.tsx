import React from 'react';
import { View } from 'react-native';
import styles from './ListEntriesScreen.styles';

import { StackScreenProps } from '@react-navigation/stack';
import EntriesFlatlist from '../../../components/EntriesFlatlist/EntriesFlatlist';

type Props = StackScreenProps<ListStack, 'ListEntriesScreen'>;

const ListEntriesScreen = ({ route, navigation }: Props) => {

	return (
		<View style={styles.screen}>
			<EntriesFlatlist listId={route.params.listId} />
		</View>
	);
};

export default ListEntriesScreen;
