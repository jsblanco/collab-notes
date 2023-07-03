import React, { useCallback, ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { aspectRatio, colors, Text } from '../../ui/libUi';
// import { LinearGradient } from "expo-linear-gradient";
// import { Box, RoundIconButton, Text, useTheme } from "../../components";
// import { aspectRatio } from "../../components/Theme";

interface SwipeableRowProps {
	children: ReactNode;
	onDelete: () => void;
	height: number;
}

const { width } = Dimensions.get('window');
const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeableRow = ({
	children,
	onDelete,
	height: defaultHeight,
}: SwipeableRowProps) => {
	// TODO - export to independent component
	const LeftActions = () => {
		return (
			<View
				style={{ flex: 1, backgroundColor: 'blue', justifyContent: 'center' }}
			>
				<Text
					style={{
						color: 'white',
						paddingHorizontal: 10,
						fontWeight: '600',
					}}
				>
					Left Action
				</Text>
			</View>
		);
	};

	return <Swipeable renderLeftActions={LeftActions}>{children}</Swipeable>;
};

export default SwipeableRow;
