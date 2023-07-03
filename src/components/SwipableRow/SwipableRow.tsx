import React, { ReactNode } from 'react';
import { Animated, Dimensions, Pressable, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { aspectRatio } from '../../ui/libUi';

interface SwipeableRowProps {
	children: ReactNode;
	onDelete: () => void;
	height: number;
}

const { width } = Dimensions.get('window');
const finalDestination = width;
const editWidth = 85 * aspectRatio;

const SwipeableRow = ({
	children,
	onDelete,
	height: defaultHeight,
}: SwipeableRowProps) => {

	// TODO - export actions to independent component
	const LeftActions = (
		_progress: Animated.AnimatedInterpolation<string | number>,
		dragX: Animated.AnimatedInterpolation<string | number>
	) => {
		const scale = dragX.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'green',
					justifyContent: 'center',
				}}
			>
				<Animated.Text
					style={{
						color: 'white',
						paddingHorizontal: 10,
						fontWeight: '600',
						transform: [{ scale }],
					}}
				>
					Completar
				</Animated.Text>
			</View>
		);
	};

	const RightActions = () => (
		<>
			<View
				style={{
					backgroundColor: 'red',
					paddingHorizontal: 15,
					justifyContent: 'center',
				}}
			>
				<Pressable onPress={onDelete}>
					<Animated.Text
						style={{
							color: 'white',
							paddingHorizontal: 10,
							fontWeight: '600',
						}}
					>
						Eliminar
					</Animated.Text>
				</Pressable>
			</View>
			<View
				style={{
					backgroundColor: 'blue',
					paddingHorizontal: 15,
					justifyContent: 'center',
				}}
			>
				<Animated.Text
					style={{
						color: 'white',
						paddingHorizontal: 10,
						fontWeight: '600',
					}}
				>
					Editar
				</Animated.Text>
			</View>
		</>
	);

	return (
		<Swipeable
			// onSwipeableWillOpen={(d) => d === 'left' && setTimeout(onDelete, 1000)}
			renderLeftActions={LeftActions}
			renderRightActions={RightActions}
		>
			{children}
		</Swipeable>
	);
};

export default SwipeableRow;
