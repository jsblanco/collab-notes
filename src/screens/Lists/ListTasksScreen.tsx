import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import TasksFlatlist from '../../components/TasksFlatlist';
import {
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { FloatingButton, Container } from '../../ui/libUi';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListTasks>;

const ListTaksScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;

	return (
		<Container style={styles.screen}>
			<TasksFlatlist listId={listId} />
			<FloatingButton
				onPress={() =>
					navigation.navigate(ListStackRoutes.TaskForm, {
						listId,
					})
				}
			>
				New task
			</FloatingButton>
		</Container>
	);
};

export default ListTaksScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
	},
});
