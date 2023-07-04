import React, { useState, useEffect, ReactNode } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, {
	useSwipeableItemParams,
	OpenDirection,
} from 'react-native-swipeable-item';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Entry } from '../../models/Entry/Entry';
import { useDispatch } from 'react-redux';
import { toggleEntryCompletion } from '../../store/lists/lists.actions';

export function AlternativeEntryItem({
	entry,
	listId,
	drag,
}: {
	entry: Entry;
	listId: string;
	drag: () => void;
}) {
	const dispatch = useDispatch();

	return (
		<ScaleDecorator>
			<SwipeableItem
				key={entry.id}
				item={entry}
				onChange={({ openDirection }) => {
					if (openDirection === 'right')
						dispatch(toggleEntryCompletion.request(listId, entry.id));
				}}
				overSwipe={30}
				renderUnderlayLeft={() => <UnderlayLeft />}
				renderUnderlayRight={() =>
					entry.isCompleted ? (
						<UnderlayCompletedTask />
					) : (
						<UnderlayPendingTask />
					)
				}
				snapPointsLeft={[90, 180]}
				snapPointsRight={[400]}
			>
				<TouchableOpacity
					activeOpacity={1}
					onLongPress={drag}
					style={[
						styles.row,
						{ backgroundColor: 'white', height: 65, paddingVertical: 10 },
					]}
				>
					<Text style={styles.text}>{`${entry.title}`}</Text>
				</TouchableOpacity>
			</SwipeableItem>
		</ScaleDecorator>
	);
}

const UnderlayLeft = () => {
	const { percentOpen } = useSwipeableItemParams<Entry>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
		}),
		[percentOpen]
	);

	return (
		<Animated.View style={styles.buttonRow}>
			<TouchableOpacity style={[styles.underlay, styles.redBg,  animStyle]}>
				<Text style={styles.text}>{`Delete`}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.underlay, styles.tealBg, animStyle]}>
				<Text style={styles.text}>{`Edit`}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

function UnderlayCompletedTask() {
	const { close, percentOpen } = useSwipeableItemParams<Entry>();
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
	const { percentOpen } = useSwipeableItemParams<Entry>();
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
				<Text style={[styles.text, { color: 'white' }]}>Complete</Text>
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
	buttonRow: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	button: {
    },
	text: {
        fontWeight: 'bold',
		color: 'black',
		fontSize: 14,
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