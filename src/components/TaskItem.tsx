import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, {
	useSwipeableItemParams,
} from 'react-native-swipeable-item';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Task } from '../models/Task/Task';
import { useDispatch } from 'react-redux';
import { toggleTaskCompletion } from '../store/lists/lists.actions';
import { H3, Text } from '../ui/libUi';
import { useNavigation } from '@react-navigation/native';
import { DrawerRoutes, ListStackRoutes } from '../navigation/NavigationTypes';

export function TaskItem({
	task,
	listId,
	drag,
}: {
	task: Task;
	listId: string;
	drag: () => void;
}) {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<ScaleDecorator>
			<SwipeableItem
				key={task.id}
				item={task}
				onChange={({ openDirection }) => {
					if (openDirection === 'right')
						dispatch(toggleTaskCompletion.request(listId, task.id));
				}}
				overSwipe={30}
				renderUnderlayLeft={() => <UnderlayLeft listId={listId} task={task} />}
				renderUnderlayRight={() =>
					task.isCompleted ? <UnderlayCompletedTask /> : <UnderlayPendingTask />
				}
				snapPointsLeft={[90, 180]}
				snapPointsRight={[400]}
			>
				<TouchableOpacity
					activeOpacity={1}
					onLongPress={drag}
					onPress={() =>
						navigation.navigate(ListStackRoutes.TaskDetails, {
							listId: listId,
							taskId: task.id,
						})
					}
					style={[styles.row, styles.item]}
				>
					<H3 style={styles.text}>{`${task.title}`}</H3>
				</TouchableOpacity>
			</SwipeableItem>
		</ScaleDecorator>
	);
}

const UnderlayLeft = ({ listId, task }: { listId: string; task: Task }) => {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const navigation = useNavigation();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
		}),
		[percentOpen]
	);

	const onEdit = () =>
		//@ts-ignore
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId: listId,
			task: task,
		});

	return (
		<Animated.View style={styles.buttonRow}>
			<TouchableOpacity style={[styles.underlay, styles.redBg, animStyle]}>
				<Text style={styles.text}>{`Delete`}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.underlay, styles.tealBg, animStyle]}
				onPress={onEdit}
			>
				<Text style={styles.text}>{`Edit`}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

function UnderlayCompletedTask() {
	const { close, percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
		}),
		[percentOpen]
	);
	return (
		<Animated.View
			style={[
				styles.row,
				styles.tealBg,
				animStyle,
				{ backgroundColor: 'yellow' },
			]}
		>
			{/* @ts-ignore */}
			<TouchableOpacity onPressOut={close}>
				<Text style={styles.text}>Reactivate</Text>
			</TouchableOpacity>
		</Animated.View>
	);
}

function UnderlayPendingTask() {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
		}),
		[percentOpen]
	);
	return (
		<Animated.View
			style={[
				styles.row,
				styles.tealBg,
				animStyle,
				{ backgroundColor: 'green' },
			]}
		>
			{/* @ts-ignore */}
			<TouchableOpacity>
				<Text style={{ ...styles.text, color: 'white' }}>Complete</Text>
			</TouchableOpacity>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
	item: {
		backgroundColor: 'white',
		flexDirection: 'column',
		borderWidth: 1,
		borderColor: '#eee',
		paddingVertical: 20,
		marginBottom: -1,
	},
	buttonRow: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	text: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: 14,
		paddingBottom: 0,
	},
	underlay: {
		flex: 1,
		height: '100%',
		maxWidth: 90,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tealBg: {
		backgroundColor: 'teal',
	},
	redBg: {
		backgroundColor: 'tomato',
	},
});
