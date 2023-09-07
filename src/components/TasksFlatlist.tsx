import React, { ReactElement, useCallback, useRef } from 'react';
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

const TasksFlatlist = ({ listId, tasks, reorderTasks }: Props) => {
	const dispatch = useDispatch();
	const rowsRefs: React.RefObject<SwipeableItemImperativeRef>[] = [];
	const itemRefs = useRef(
		new Map<string, React.RefObject<SwipeableItemImperativeRef>>()
	);

	const renderItem = useCallback((params: RenderItemParams<Task>) => {
		const itemRef = useRef<SwipeableItemImperativeRef>(null);
		if (typeof params.getIndex() === 'number')
			rowsRefs[params.getIndex() as number] = itemRef;
		return <TaskItem {...params} itemRefs={itemRefs} task={params.item} />;
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
			containerStyle={styles.container}
			keyExtractor={(item, i) => item.id + i}
			onDragEnd={reorderTasks ? changeTaskOrder : undefined}
			data={tasks}
			activationDistance={10}
			renderItem={renderItem}
		/>
	);
};

export default TasksFlatlist;

const styles = StyleSheet.create({
	container: { width: '100%', flex: 1 },
	emptyListMessage: { marginTop: 20, marginBottom: 30 },
});
