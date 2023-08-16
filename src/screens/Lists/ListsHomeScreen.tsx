import React, { FunctionComponent, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import {
	DrawerProps,
	DrawerRoutes,
	ListStackProps,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, H2, H3 } from '../../ui/libUi';
import DraggableFlatList, {
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../models/Task/Task';
import { List } from '../../models/List/List';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListsHome>;
const ListsHomeScreen: FunctionComponent<Props> = ({ route, navigation }) => {
	const { lists } = useSelector((state: RootState) => state.lists);

	const renderItem = useCallback(
		(listId: string, params: RenderItemParams<Task>) => (
			<TaskItem {...params} listId={listId} task={params.item} />
		),
		[]
	);

	return (
		<Container style={styles.screen}>
			<H2 style={styles.titles}>
				You have{' '}
				{lists.reduce((acc, list) => list.pendingTasks.length + acc, 0)} pending
				tasks
			</H2>

			{lists.map((list: List, i: number) => (
				<>
					<Pressable
						onPress={() =>
							navigation.navigate(DrawerRoutes.List, {
								screen: ListStackRoutes.ListTasks,
								params: { listId: list.id },
							})
						}
					>
						<H3 style={styles.titles}>{list.title}</H3>
					</Pressable>
					<DraggableFlatList
						containerStyle={{ width: '100%' }}
						style={{ paddingBottom: 60 }}
						data={list.pendingTasks ?? []}
						keyExtractor={(item) => item.id}
						activationDistance={10}
						renderItem={renderItem.bind(null, list.id)}
					/>
				</>
			))}
		</Container>
	);
};

export default ListsHomeScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		paddingTop: 20,
	},
	titles: {
		paddingHorizontal: 20,
		width: '100%',
	},
});
