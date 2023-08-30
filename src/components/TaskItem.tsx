import React, { useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, {
	OpenDirection,
	SwipeableItemImperativeRef,
	useSwipeableItemParams,
} from 'react-native-swipeable-item';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Task } from '@app/models';
import { ListStackRoutes } from '@app/navigation/NavigationTypes';
import { removeListTask, toggleTaskCompletion } from '@app/store';
import { colors, fonts, H3, Text } from '@app/ui';

export function TaskItem({
	task,
	drag,
	itemRef: ref,
}: {
	task: Task;
	drag: () => void;
	itemRef?: React.ForwardedRef<SwipeableItemImperativeRef>;
}) {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<ScaleDecorator>
			<SwipeableItem
				key={task.id}
				ref={ref}
				item={task}
				onChange={({ openDirection }) => {
					if (openDirection === OpenDirection.RIGHT)
						dispatch(toggleTaskCompletion.request(task.listId, task.id));
				}}
				overSwipe={30}
				renderUnderlayLeft={() => <UnderlayLeft task={task} />}
				renderUnderlayRight={() =>
					!!task.isCompleted ? <UnderlayCompletedTask /> : <UnderlayPendingTask />
				}
				snapPointsLeft={[90, 180]}
				snapPointsRight={[400]}>
				<TouchableOpacity
					activeOpacity={1}
					onLongPress={drag}
					onPress={() =>
						//@ts-ignore
						navigation.navigate(ListStackRoutes.TaskDetails, {
							listId: task.listId,
							taskId: task.id,
						})
					}
					style={[styles.row, styles.item]}>
					<H3 style={styles.title}>{task.title}</H3>
				</TouchableOpacity>
			</SwipeableItem>
		</ScaleDecorator>
	);
}

const UnderlayLeft = ({ task }: { task: Task }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
		}),
		[percentOpen]
	);

	const onDeleteTask = useCallback(() => {
		Alert.alert(
			`Delete task "${task.title}"`,
			'Are you sure you want to delete this task from this list for all users?\nThis cannot be undone.',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => dispatch(removeListTask.request(task.listId, task.id)),
					style: 'destructive',
				},
			]
		);
	}, [task]);

	const onEdit = () =>
		//@ts-ignore
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId: task.listId,
			taskId: task.id,
		});

	return (
		<Animated.View style={styles.buttonRow}>
			<TouchableOpacity
				onPress={onDeleteTask}
				style={[styles.underlay, styles.redBg, styles.buttonPadding, animStyle]}>
				<Text style={styles.text}>{`Delete`}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.underlay, styles.blueBg, styles.buttonPadding, animStyle]}
				onPress={onEdit}>
				<Text style={styles.text}>{`Edit`}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

function UnderlayCompletedTask() {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value * 3,
		}),
		[percentOpen]
	);
	return (
		<LinearGradient
			colors={[colors.pending, colors.background]}
			style={[styles.row]}
			start={[0, 0]}
			end={[1, 0]}>
			<Animated.View style={animStyle}>
				{/* @ts-ignore */}
				<TouchableOpacity>
					<Text style={{ ...styles.text, color: 'white' }}>Reactivate</Text>
				</TouchableOpacity>
			</Animated.View>
		</LinearGradient>
	);
}

function UnderlayPendingTask() {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value * 3,
		}),
		[percentOpen]
	);
	return (
		<LinearGradient
			colors={[colors.completed, colors.background]}
			style={[styles.row]}
			start={[0, 0]}
			end={[1, 0]}>
			<Animated.View style={animStyle}>
				{/* @ts-ignore */}
				<TouchableOpacity>
					<Text style={{ ...styles.text, color: 'white' }}>Complete</Text>
				</TouchableOpacity>
			</Animated.View>
		</LinearGradient>
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
		// justifyContent: 'center',
		padding: 15,
	},
	item: {
		backgroundColor: 'white',
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
		fontSize: 16,
		paddingBottom: 0,
		fontFamily: fonts.regular,
		paddingLeft: 5,
		width: '100%',
		color: 'white',
	},
	title: {
		fontSize: 16,
		paddingBottom: 0,
		fontFamily: fonts.regular,
		paddingLeft: 5,
		width: '100%',
	},
	underlay: {
		flex: 1,
		height: '100%',
		maxWidth: 90,
		alignItems: 'center',
		justifyContent: 'center',
	},
	blueBg: {
		backgroundColor: colors.general.blue,
	},
	redBg: {
		backgroundColor: colors.general.red,
	},
	buttonPadding: {
		paddingHorizontal: 10,
	},
});
