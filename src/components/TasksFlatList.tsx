import type { Task } from "@app/models";
import type { DrawerProps } from "@app/router/drawer/DrawerNavigation.types";
import { changeTaskListIndex } from "@app/store";
import { Text } from "@app/ui";
import type { NavigationProp } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import DraggableFlatList, {
	type DragEndParams,
	type RenderItemParams,
} from "react-native-draggable-flatlist";
import type { SwipeableItemImperativeRef } from "react-native-swipeable-item";
import { useDispatch } from "react-redux";
import { TaskItem } from "./TaskItem";

interface Props {
	listId: string;
	tasks: Task[];
	reorderTasks?: boolean;
	navigation: NavigationProp<DrawerProps>;
}

export const TasksFlatList = ({
	listId,
	tasks,
	navigation,
	reorderTasks,
}: Props) => {
	const dispatch = useDispatch();
	const itemRefs = useRef(new Map<string, SwipeableItemImperativeRef>());

	const renderItem = useCallback(
		(params: RenderItemParams<Task>) => {
			return (
				<TaskItem
					{...params}
					navigation={navigation}
					itemRefs={itemRefs}
					task={params.item}
				/>
			);
		},
		[navigation],
	);

	const changeTaskOrder = useCallback(
		({ data }: DragEndParams<Task>) => {
			dispatch(
				changeTaskListIndex.request(
					listId,
					data.map((task) => task.id),
				),
			);
		},
		[dispatch, listId],
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

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
	},
	emptyListMessage: {
		marginTop: 20,
		marginBottom: 30,
	},
});
