import type { PropsWithChildren } from "react";
import {
	Text as ReactText,
	type StyleProp,
	type TextStyle,
} from "react-native";
import styles from "./Text.styles";

type TextPropTypes = PropsWithChildren<{
	numberOfLines?: number;
	style?: StyleProp<TextStyle>;
	center?: boolean;
	noPadding?: boolean;
	selectable?: boolean;
}>;

export const Text = ({ style, selectable = true, ...props }: TextPropTypes) => {
	return (
		<ReactText
			{...props}
			selectable={selectable}
			style={[
				styles.P,
				{
					textAlign: props.center ? "center" : "auto",
					paddingBottom: props.noPadding ? 0 : 8,
				},
				style,
			]}
		>
			{props.children}
		</ReactText>
	);
};

export const B = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.B, style]}>
		{props.children}
	</Text>
);
export const H1 = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.H1, style]}>
		{props.children}
	</Text>
);
export const H2 = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.H2, style]}>
		{props.children}
	</Text>
);
export const H3 = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.H3, style]}>
		{props.children}
	</Text>
);
export const H4 = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.H4, style]}>
		{props.children}
	</Text>
);
export const Label = ({ style, ...props }: TextPropTypes) => (
	<H3 {...props} style={[styles.label, style]}>
		{props.children}
	</H3>
);
export const ErrorMessage = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.Error, style]}>
		{props.children}
	</Text>
);
export const Placeholder = ({ style, ...props }: TextPropTypes) => (
	<Text {...props} style={[styles.Placeholder, style]}>
		{props.children}
	</Text>
);
