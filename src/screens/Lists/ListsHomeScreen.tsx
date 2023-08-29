import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import TasksFlatlist from '@app/components/TasksFlatlist';
import { List } from '@app/models';
import {
	getDrawerListLink,
	ListStackProps,
	ListStackRoutes,
} from '@app/navigation/NavigationTypes';
import { RootState } from '@app/store/store';
import { Container, H2, H3 } from '@app/ui';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListsHome>;
const ListsHomeScreen = ({ route, navigation }: Props) => {
	const { lists } = useSelector((state: RootState) => state.lists);

	return (
		<Container style={styles.screen}>
			<View style={styles.header}>
				<H2 style={styles.titles}>
					You have {lists.reduce((acc, list) => list.pendingTasks.length + acc, 0)}{' '}
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
							//@ts-ignore
							navigation.navigate(getDrawerListLink(list.id), {
								screen: ListStackRoutes.ListTasks,
								params: {
									listId: list.id,
								},
							});
						}}>
						<Ionicons name={list.icon} color={'#000'} size={24} />
						<H3 style={styles.titles}>{list.title}</H3>
					</Pressable>
					<TasksFlatlist listId={list.id} tasks={list.pendingTasks} reorderTasks />
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
		// paddingBottom: 60,
	},
});
