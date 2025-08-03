import type { PropsWithChildren } from "react";
import {
	type FlexAlignType,
	Platform,
	Modal as ReactModal,
	type StyleProp,
	TouchableOpacity,
	View,
	type ViewStyle,
} from "react-native";
import { CloseButton } from "../inputs";
import styles from "./Layout.styles";

type FlexProps = {
	alignItems?: FlexAlignType;
	justifyContent?:
		| "center"
		| "flex-start"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
};

type ContainerType = PropsWithChildren<
	{
		pointerEvents?: "auto" | "none" | "box-none";
		style?: StyleProp<ViewStyle>;
	} & FlexProps
>;

type RowType = PropsWithChildren<
	{
		pointerEvents?: "auto" | "none" | "box-none";
		style?: StyleProp<ViewStyle>;
	} & FlexProps
>;

export const Card = ({
	children,
	style,
}: PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
}>) => {
	return <View style={[styles.card, style]}>{children}</View>;
};

export const Modal = ({
	visible,
	onRequestClose,
	children,
	style,
}: PropsWithChildren<{
	visible: boolean;
	style?: StyleProp<ViewStyle>;
	onRequestClose: () => void;
}>) => {
	return (
		<ReactModal
			visible={visible}
			animationType="slide"
			onRequestClose={onRequestClose}
			presentationStyle="pageSheet"
			style={[styles.modalView, style]}
		>
			{Platform.OS === "android" && (
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
		<View style={{ flexDirection: "row" }}>
			<View style={styles.inlineBlock} />
			{children}
			<View style={styles.inlineBlock} />
		</View>
	);
};

export const Row = ({
	children,
	justifyContent,
	alignItems,
	style,
	pointerEvents = "auto",
}: RowType) => {
	return (
		<View
			pointerEvents={pointerEvents}
			style={[styles.row, { justifyContent, alignItems }, style]}
		>
			{children}
		</View>
	);
};

export const DescriptionField = ({
	style,
	children,
}: PropsWithChildren<{ style?: ViewStyle }>) => (
	<View style={[styles.description, style]}>{children}</View>
);

export const Container = ({
	children,
	justifyContent,
	alignItems,
	style,
	pointerEvents = "auto",
}: ContainerType) => {
	return (
		<View
			pointerEvents={pointerEvents}
			style={[styles.container, style, { justifyContent, alignItems }]}
		>
			{children}
		</View>
	);
};

export const Separator = () => <View style={styles.separator} />;
