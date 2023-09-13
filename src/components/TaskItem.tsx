import React, { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, {
	OpenDirection,
	useSwipeableItemParams,
} from 'react-native-swipeable-item';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Task } from '@app/models';
import { ListStackRoutes } from '@app/router/NavigationTypes';
import { removeListTask, toggleTaskCompletion } from '@app/store';
import { colors, fonts, H3, OSButton, Text } from '@app/ui';

export function TaskItem({
	task,
	drag,
	itemRefs,
}: {
	task: Task;
	drag: () => void;
	itemRefs: React.MutableRefObject<Map<any, any>>;
}) {
	const dispatch = useDispatch();

	const navigation = useNavigation();
	const closeThisRow = () => itemRefs.current.get(task.id)?.close();

	return (
		<ScaleDecorator>
			<SwipeableItem
				key={task.id}
				ref={(ref) =>
					ref && !itemRefs.current.get(task.id) && itemRefs.current.set(task.id, ref)
				}
				item={task}
				onChange={({ openDirection }) => {
					if (openDirection !== OpenDirection.NONE)
						[...itemRefs.current.entries()].forEach(([key, ref]) => {
							if (key !== task.id && ref) ref?.close();
						});
					if (openDirection === OpenDirection.RIGHT)
						dispatch(toggleTaskCompletion.request(task.listId, task.id));
				}}
				overSwipe={30}
				renderUnderlayLeft={() => (
					<UnderlayLeft task={task} closeRow={closeThisRow} />
				)}
				renderUnderlayRight={() =>
					!!task.isCompleted ? <UnderlayCompletedTask /> : <UnderlayPendingTask />
				}
				snapPointsLeft={[90, 180]}
				snapPointsRight={[400]}>
				<OSButton
					activeOpacity={1}
					onLongPress={drag}
					onPress={() => {
						//@ts-ignore
						navigation.navigate(ListStackRoutes.TaskDetails, {
							listId: task.listId,
							taskId: task.id,
						});

						[...itemRefs.current.entries()].forEach(([_, ref]) => ref?.close());
						// ref.current.close();
					}}
					style={[styles.row, styles.item]}>
					<H3 style={styles.title}>{task.title}</H3>
				</OSButton>
			</SwipeableItem>
		</ScaleDecorator>
	);
}

const UnderlayLeft = ({
	task,
	closeRow,
}: {
	task: Task;
	closeRow: () => void;
}) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value * 2,
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
					onPress: () => {
						console.log('Cancel Pressed');
						closeRow();
					},
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => dispatch(removeListTask.request(task.listId, task.id)),
					style: 'destructive',
				},
			]
		);
	}, [task, closeRow]);

	const onEdit = useCallback(() => {
		//@ts-ignore
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId: task.listId,
			taskId: task.id,
		});
		closeRow();
	}, [navigation, closeRow]);

	return (
		<Animated.View style={[styles.buttonRow, animStyle]}>
			<OSButton
				onPress={onDeleteTask}
				style={[styles.underlay, styles.redBg, styles.buttonPadding]}>
				<Text style={styles.underlayText}>{`Delete`}</Text>
			</OSButton>
			<OSButton
				style={[styles.underlay, styles.blueBg, styles.buttonPadding]}
				onPress={onEdit}>
				<Text style={styles.underlayText}>{`Edit`}</Text>
			</OSButton>
		</Animated.View>
	);
};

function UnderlayCompletedTask() {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			flex: 1,
			opacity: percentOpen.value * 3,
		}),
		[percentOpen]
	);
	return (
		<Animated.View style={animStyle}>
			<LinearGradient
				colors={[colors.pending, colors.background]}
				style={[styles.row]}
				start={[0, 0]}
				end={[1, 0]}>
				{/* @ts-ignore */}
				<OSButton>
					<Text style={{ ...styles.underlayText, color: 'white' }}>Reactivate</Text>
				</OSButton>
			</LinearGradient>
		</Animated.View>
	);
}

function UnderlayPendingTask() {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			flex: 1,
			opacity: percentOpen.value * 3,
		}),
		[percentOpen]
	);
	return (
		<Animated.View style={animStyle}>
			<LinearGradient
				colors={[colors.completed, colors.background]}
				style={[styles.row]}
				start={[0, 0]}
				end={[1, 0]}>
				{/* @ts-ignore */}
				<OSButton>
					<Text style={{ ...styles.underlayText, color: 'white' }}>Complete</Text>
				</OSButton>
			</LinearGradient>
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
		padding: 15,
		marginBottom: 1,
	},
	item: {
		backgroundColor: colors.white,
		paddingVertical: 20,
	},
	buttonRow: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 1,
	},
	underlayText: {
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
		paddingLeft: 15,
		width: '100%',
	},
	underlay: {
		height: '100%',
		width: 90,
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
