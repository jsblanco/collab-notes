import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, {
	useSwipeableItemParams,
	OpenDirection,
} from 'react-native-swipeable-item';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Entry } from '../../models/Entry/Entry';

export function AlternativeEntryItem({
	entry,
	itemRefs,
	drag,
	onPressDelete,
}: {
	entry: Entry;
	drag: () => void;
	onPressDelete: () => void;
	itemRefs: React.MutableRefObject<Map<any, any>>;
}) {

	return (
		<ScaleDecorator>
			<SwipeableItem
				key={entry.id}
				item={entry}
				// ref={(ref) => {
				// 	if (ref && !itemRefs.current.get(entry.id)) {
				// 		itemRefs.current.set(entry.id, ref);
				// 	}
				// }}
				// onChange={({ openDirection }) => {
				// 	if (openDirection !== OpenDirection.NONE) {
				// 		// Close all other open items
				// 		[...itemRefs.current.entries()].forEach(([key, ref]) => {
				// 			if (key !== entry.id && ref) ref.close();
				// 		});
				// 	}
				// }}
				overSwipe={30}
				renderUnderlayLeft={() => (
					<UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
				)}
				renderUnderlayRight={() => <UnderlayRight />}
				snapPointsLeft={[100]}
                snapPointsRight={[100]}
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

const UnderlayLeft = ({
	drag,
	onPressDelete,
}: {
	drag: () => void;
	onPressDelete: () => void;
}) => {
	const { item, percentOpen } = useSwipeableItemParams<Entry>();
	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
		}),
		[percentOpen]
	);

	return (
		<Animated.View
			style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
		>
			<TouchableOpacity onPress={onPressDelete}>
				<Text style={styles.text}>{`[delete]`}</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

function UnderlayRight() {
	const { close } = useSwipeableItemParams<Entry>();
	return (
		<Animated.View style={[styles.row, styles.underlayRight]}>
			{/* @ts-ignore */}
			<TouchableOpacity onPressOut={close}>
				<Text style={styles.text}>CLOSE</Text>
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
	text: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: 14,
	},
	underlayRight: {
		flex: 1,
		backgroundColor: 'teal',
		justifyContent: 'flex-start',
	},
	underlayLeft: {
		flex: 1,
		backgroundColor: 'tomato',
		justifyContent: 'flex-end',
	},
});
