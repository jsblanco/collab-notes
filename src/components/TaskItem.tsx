import type { Task } from "@app/models";
import { getDrawerListLink } from "@app/router/drawer/DrawerNavigation.types";
import { ListStackRoutes } from "@app/router/stacks/ListStack.types";
import { removeListTask, toggleTaskCompletion } from "@app/store";
import { colors, fonts, H3, OSButton, Row, Text } from "@app/ui";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import type React from "react";
import { useCallback } from "react";
import { Alert, ImageBackground, StyleSheet } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, {
	OpenDirection,
	type SwipeableItemImperativeRef,
	useSwipeableItemParams,
} from "react-native-swipeable-item";
import { useDispatch } from "react-redux";
import PeriodicityBadge from "./PeriodicityBadge";

const colorGradient = [
	"white",
	"rgba(255, 255, 255, 0.8)",
	"rgba(255, 255, 255, 0.3)",
	"rgba(255, 255, 255, 0.2)",
	"transparent",
];

type TaskItemProps = {
	task: Task;
	drag: () => void;
	itemRefs: React.MutableRefObject<Map<string, SwipeableItemImperativeRef>>;
};

export function TaskItem({ task, drag, itemRefs }: TaskItemProps) {
	const dispatch = useDispatch();

	const navigation = useNavigation();
	const closeThisRow = useCallback(
		() => itemRefs.current.get(task.id)?.close(),
		[itemRefs.current.get, task.id],
	);

	const itemBody = (
		<Row
			alignItems="center"
			justifyContent="space-between"
			style={styles.contentRow}
		>
			<H3 noPadding style={styles.title}>
				{task.title}
			</H3>
			<PeriodicityBadge periodicity={task.periodicity} />
		</Row>
	);

	const onSwipeItem = useCallback(
		({ openDirection }: { openDirection: OpenDirection }) => {
			if (openDirection !== OpenDirection.NONE)
				[...itemRefs.current.entries()].forEach(([key, ref]) => {
					if (key !== task.id && ref) ref?.close();
				});
			if (openDirection === OpenDirection.RIGHT)
				dispatch(toggleTaskCompletion.request(task.listId, task.id));
		},
		[dispatch, task.id, itemRefs.current.entries, task.listId],
	);

	const onPressItem = useCallback(() => {
		navigation.navigate(getDrawerListLink(task.listId), {
			screen: ListStackRoutes.TaskDetails,
			params: {
				listId: task.listId,
				taskId: task.id,
			},
		});

		[...itemRefs.current.entries()].forEach(([_, ref]) => ref?.close());
	}, [navigation.navigate, task.id, itemRefs.current.entries, task.listId]);

	const onAssigningItemRef = useCallback(
		(ref: SwipeableItemImperativeRef | null) =>
			ref &&
			!itemRefs.current.get(task.id) &&
			itemRefs.current.set(task.id, ref),
		[task, itemRefs],
	);

	const onRenderUnderlayLeft = useCallback(
		() => <UnderlayLeft task={task} closeRow={closeThisRow} />,
		[task, closeThisRow],
	);

	const onRenderUnderlayRight = useCallback(
		() =>
			task.isCompleted ? <UnderlayCompletedTask /> : <UnderlayPendingTask />,
		[task.isCompleted],
	);

	return (
		<ScaleDecorator>
			<SwipeableItem
				key={task.id}
				item={task}
				overSwipe={30}
				onChange={onSwipeItem}
				ref={onAssigningItemRef}
				renderUnderlayLeft={onRenderUnderlayLeft}
				renderUnderlayRight={onRenderUnderlayRight}
				snapPointsLeft={[90, 180]}
				snapPointsRight={[400]}
			>
				<OSButton
					activeOpacity={1}
					onLongPress={drag}
					onPress={onPressItem}
					style={[styles.row, styles.item]}
				>
					{task.images[0]?.preview ? (
						<ImageBackground
							source={{ uri: task.images[0].preview }}
							resizeMode="cover"
							style={styles.imageBackground}
						>
							<LinearGradient
								colors={colorGradient}
								style={[styles.row]}
								start={[0.35, 1]}
								end={[1, 0]}
							>
								{itemBody}
							</LinearGradient>
						</ImageBackground>
					) : (
						itemBody
					)}
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
		[percentOpen],
	);

	const onDeleteTask = useCallback(() => {
		Alert.alert(
			`Delete task "${task.title}"`,
			"Are you sure you want to delete this task from this list for all users?\nThis cannot be undone.",
			[
				{
					text: "Cancel",
					onPress: () => {
						console.log("Cancel Pressed");
						closeRow();
					},
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => dispatch(removeListTask.request(task.listId, task.id)),
					style: "destructive",
				},
			],
		);
	}, [task, closeRow, dispatch]);

	const onEdit = useCallback(() => {
		//@ts-ignore
		navigation.navigate(ListStackRoutes.TaskForm, {
			listId: task.listId,
			taskId: task.id,
		});
		closeRow();
	}, [navigation, closeRow, task.id, task.listId]);

	return (
		<Animated.View style={[styles.buttonRow, animStyle]}>
			<OSButton
				onPress={onDeleteTask}
				style={[styles.underlay, styles.redBg, styles.buttonPadding]}
			>
				<Text style={styles.underlayText}>{`Delete`}</Text>
			</OSButton>
			<OSButton
				style={[styles.underlay, styles.blueBg, styles.buttonPadding]}
				onPress={onEdit}
			>
				<Text style={styles.underlayText}>{`Edit`}</Text>
			</OSButton>
		</Animated.View>
	);
};

const UnderlayCompletedTask = () => {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			flex: 1,
			opacity: percentOpen.value * 3,
		}),
		[percentOpen],
	);
	return (
		<Animated.View style={animStyle}>
			<LinearGradient
				colors={[colors.pending, colors.background]}
				style={[styles.row]}
				start={[0, 0]}
				end={[1, 0]}
			>
				{/* @ts-ignore */}
				<OSButton>
					<Text style={{ ...styles.underlayText, color: "white" }}>
						Reactivate
					</Text>
				</OSButton>
			</LinearGradient>
		</Animated.View>
	);
};

const UnderlayPendingTask = () => {
	const { percentOpen } = useSwipeableItemParams<Task>();
	const animStyle = useAnimatedStyle(
		() => ({
			flex: 1,
			opacity: percentOpen.value * 3,
		}),
		[percentOpen],
	);
	return (
		<Animated.View style={animStyle}>
			<LinearGradient
				colors={[colors.completed, colors.background]}
				style={[styles.row]}
				start={[0, 0]}
				end={[1, 0]}
			>
				{/* @ts-ignore */}
				<OSButton>
					<Text style={{ ...styles.underlayText, color: "white" }}>
						Complete
					</Text>
				</OSButton>
			</LinearGradient>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
	},
	item: {
		backgroundColor: colors.white,
		marginBottom: 1,
	},
	buttonRow: {
		width: "100%",
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		marginBottom: 1,
	},
	underlayText: {
		fontSize: 16,
		paddingBottom: 0,
		fontFamily: fonts.regular,
		paddingLeft: 5,
		width: "100%",
		color: "white",
	},
	imageBackground: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	title: {
		fontSize: 16,
		fontFamily: fonts.regular,
	},
	contentRow: {
		padding: 12,
		paddingLeft: 35,
		paddingRight: 19,
	},
	underlay: {
		height: "100%",
		width: 90,
		alignItems: "center",
		justifyContent: "center",
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
