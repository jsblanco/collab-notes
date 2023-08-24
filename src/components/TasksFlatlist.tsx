import React, { useCallback } from 'react';
import { Task } from '../models/Task.models';
import DraggableFlatList, {
	DragEndParams,
	RenderItemParams,
} from 'react-native-draggable-flatlist';
import { TaskItem } from './TaskItem';
import { useDispatch } from 'react-redux';
import { changeTaskListIndex } from '../store/lists/lists.actions';
import { Text } from '../ui/libUi';

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
	const renderItem = useCallback(
		(params: RenderItemParams<Task>) => (
			<TaskItem {...params} task={params.item} />
		),
		[]
	);

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

	if (!tasks.length) return <Text center>No tasks in this list</Text>;

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
