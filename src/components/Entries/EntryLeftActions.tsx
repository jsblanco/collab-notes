import React from 'react';
import { Animated, View } from 'react-native';

interface Props {
	progress: Animated.AnimatedInterpolation<string | number>;
	dragX: Animated.AnimatedInterpolation<string | number>;
}

const EntryLeftActions = ({ progress, dragX }: Props) => {
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
				{' '}
				Completar
			</Animated.Text>
		</View>
	);
};

export default EntryLeftActions;
