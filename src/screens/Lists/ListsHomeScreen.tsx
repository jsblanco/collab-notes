import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
	DrawerProps,
	DrawerRoutes,
	ListStackRoutes,
} from '../../navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Ionicons } from '@expo/vector-icons';
import { Container, H2, H3 } from '../../ui/libUi';
import DraggableFlatList, {
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../models/Task/Task';
import { List } from '../../models/List/List';
import { DrawerScreenProps } from '@react-navigation/drawer';

type Props = DrawerScreenProps<DrawerProps, DrawerRoutes.Home>;
const ListsHomeScreen = ({ route, navigation }: Props) => {
	const { lists } = useSelector((state: RootState) => state.lists);

	const renderItem = useCallback(
		(listId: string, params: RenderItemParams<Task>) => (
			<TaskItem {...params} listId={listId} task={params.item} />
		),
		[]
	);

	return (
		<Container style={styles.screen}>
			<View style={styles.header}>
				<H2 style={styles.titles}>
					You have{' '}
					{lists.reduce((acc, list) => list.pendingTasks.length + acc, 0)}{' '}
					pending tasks
				</H2>
			</View>

			{lists.map((list: List, i: number) => (
				<View style={styles.listView} key={list.id}>
					<Pressable
						style={{
							width: '100%',
							flexDirection: 'row',
							paddingHorizontal: 20,
						}}
						onPress={() => {
							navigation.navigate(DrawerRoutes.List, {
								screen: ListStackRoutes.ListTasks,
								params: { listId: list.id },
							});
						}}
					>
						<Ionicons name={list.icon} color={'#000'} size={24} />
						<H3 style={styles.titles}>{list.title}</H3>
					</Pressable>
					<DraggableFlatList
						containerStyle={{ width: '100%' }}
						data={list.pendingTasks ?? []}
						keyExtractor={(item) => item.id}
						activationDistance={10}
						renderItem={renderItem.bind(null, list.id)}
					/>
				</View>
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
		flexDirection: 'row',
	},
	header: {
		paddingBottom: 40,
	},
	listView: {
		width: '100%',
		paddingBottom: 60,
	},
});
