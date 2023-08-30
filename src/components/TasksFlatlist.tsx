import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import DraggableFlatList, {
	DragEndParams,
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { SwipeableItemImperativeRef } from 'react-native-swipeable-item';
import { useDispatch } from 'react-redux';
import { Task } from '@app/models';
import { changeTaskListIndex } from '@app/store';
import { Text } from '@app/ui';
import { TaskItem } from './TaskItem';

interface Props {
	listId: string;
	tasks: Task[];
	reorderTasks?: boolean;
}

const TasksFlatlist = ({
	listId,
	tasks,
	reorderTasks: reorderTasks,
}: Props) => {
	const dispatch = useDispatch();
	const rowsRefs: React.RefObject<SwipeableItemImperativeRef>[] = [];

	const renderItem = useCallback((params: RenderItemParams<Task>) => {
		const itemRef = useRef<SwipeableItemImperativeRef>(null);
		if (typeof params.getIndex() === 'number')
			rowsRefs[params.getIndex() as number] = itemRef;
		return <TaskItem {...params} itemRef={itemRef} task={params.item} />;
	}, []);

	const changeTaskOrder = useCallback(
		({ data, from, to }: DragEndParams<Task>) => {
			dispatch(
				changeTaskListIndex.request(
					listId,
					data.map((task) => task.id)
				)
			);
		},
		[dispatch, listId]
	);

	if (!tasks.length)
		return (
			<Text style={styles.emptyListMessage} center>
				No tasks in this list
			</Text>
		);

	return (
		<DraggableFlatList
			containerStyle={{ width: '100%' }}
			keyExtractor={(item) => item.id}
			style={{ marginBottom: 50 }}
			onDragEnd={reorderTasks ? changeTaskOrder : undefined}
			data={tasks}
			activationDistance={10}
			renderItem={renderItem}
			// ListFooterComponent={<Text>TODO: Add a new  task</Text>}
		/>
	);
};

export default TasksFlatlist;

const styles = StyleSheet.create({
	emptyListMessage: { marginTop: 20, marginBottom: 30 },
});
