import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import CompletionBadge from '@app/components/CompletionBadge';
import TasksFlatlist from '@app/components/TasksFlatlist';
import { List } from '@app/models';
import {
	getDrawerListLink,
	ListStackProps,
	ListStackRoutes,
} from '@app/router/NavigationTypes';
import { RootState } from '@app/store';
import { Container, H2, H3, Row } from '@app/ui';

type Props = StackScreenProps<ListStackProps, ListStackRoutes.ListsHome>;
const ListsHomeScreen = ({ route, navigation }: Props) => {
	const { lists } = useSelector((state: RootState) => state.lists);

	const renderLists = ({ item }: { item: List }) => (
		<View style={styles.listView}>
			<Pressable
				style={{
					width: '100%',
					flexDirection: 'row',
					paddingHorizontal: 20,
				}}
				onPress={() => {
					//@ts-ignore
					navigation.navigate(getDrawerListLink(item.id), {
						screen: ListStackRoutes.ListTasks,
						params: {
							listId: item.id,
						},
					});
				}}>
				<Row style={styles.titles}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name={item.icon} color={'#000'} size={24} />
						<H3 noPadding style={{ marginLeft: 10 }}>
							{item.title}
						</H3>
					</View>

					<CompletionBadge isCompleted={false} />
				</Row>
			</Pressable>
			<TasksFlatlist listId={item.id} tasks={item.pendingTasks} reorderTasks />
		</View>
	);

	return (
		<Container style={styles.screen}>
			<FlatList
				data={lists}
				ListHeaderComponent={
					<View style={styles.header}>
						<H2>
							You have {lists.reduce((acc, list) => list.pendingTasks.length + acc, 0)}{' '}
							pending tasks
						</H2>
					</View>
				}
				renderItem={renderLists}
				contentContainerStyle={{ width: '100%' }}
				keyExtractor={(item) => item.id}
			/>
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
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingHorizontal: 20,
		paddingVertical: 5,
	},
	header: {
		paddingBottom: 40,
		width: '100%',
		alignItems: 'center',
	},
	listView: {
		width: '100%',
		// paddingBottom: 60,
	},
});
