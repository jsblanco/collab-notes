import React from 'react';
import { Animated, View } from 'react-native';

interface Props {
	isCompleted: boolean;
	progress: Animated.AnimatedInterpolation<string | number>;
	dragX: Animated.AnimatedInterpolation<string | number>;
}

const EntryLeftActions = ({ isCompleted, progress, dragX }: Props) => {
	const scale = dragX.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: isCompleted ? 'yellow' : 'green',
				justifyContent: 'center',
			}}
		>
			<Animated.Text
				style={{
					color: isCompleted ? 'black' : 'white',
					paddingHorizontal: 10,
					fontWeight: '600',
					transform: [{ scale }],
				}}
			>
				{' '}
				{isCompleted ? 'Reactivar' : 'Completar'}
			</Animated.Text>
		</View>
	);
};

export default EntryLeftActions;
