import React, { PropsWithChildren } from 'react';
import {
	Platform,
	Modal as ReactModal,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, IconNames } from '../constants';
import { CloseButton, FloatingButton } from '../inputs';
import styles from './Layout.styles';

type ContainerType = PropsWithChildren<{
	pointerEvents?: 'auto' | 'none' | 'box-none';
	center?: boolean;
	style?: ViewStyle;
}>;

type RowType = PropsWithChildren<{
	pointerEvents?: 'auto' | 'none' | 'box-none';
	centerX?: boolean;
	centerY?: boolean;
	style?: ViewStyle;
}>;

export const Card = ({
	children,
	style,
}: PropsWithChildren<{
	style?: ViewStyle;
}>) => {
	return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export const Modal = ({
	visible,
	onRequestClose,
	children,
	style,
}: PropsWithChildren<{
	visible: boolean;
	style?: ViewStyle;
	onRequestClose: () => void;
}>) => {
	return (
		<ReactModal
			visible={visible}
			animationType="slide"
			onRequestClose={onRequestClose}
			presentationStyle="pageSheet"
			style={[styles.modalView, style]}>
			{Platform.OS === 'android' && (
				<CloseButton
					top={20}
					size={32}
					right={10}
					onRequestClose={onRequestClose}
				/>
			)}
			{children}
		</ReactModal>
	);
};

export const Padding = ({ px }: { px: number }) => (
	<View style={{ padding: px }} />
);

export const DraggableHeader = () => {
	return (
		<View>
			<View style={styles.flatlistBackground} />
			<View style={styles.flatlistHeader}>
				<TouchableOpacity style={styles.draggableIndicator} />
			</View>
		</View>
	);
};

export const InlineBlock = ({ children }: PropsWithChildren) => {
	return (
		<View style={{ flexDirection: 'row' }}>
			<View style={styles.inlineBlock} />
			{children}
			<View style={styles.inlineBlock} />
		</View>
	);
};

export const Row = ({
	children,
	centerX,
	centerY,
	style,
	pointerEvents = 'auto',
}: RowType) => {
	return (
		<View
			pointerEvents={pointerEvents}
			style={[
				styles.row,
				centerX && styles.justifyCenter,
				centerY && styles.alignCenter,
				style,
			]}>
			{children}
		</View>
	);
};

export const Container = ({
	children,
	center,
	style,
	pointerEvents = 'auto',
}: ContainerType) => {
	return (
		<View
			pointerEvents={pointerEvents}
			style={[styles.container, center && styles.justifyCenter, style]}>
			{children}
		</View>
	);
};

export const Separator = () => <View style={styles.separator} />;
