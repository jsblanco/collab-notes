import React, { ReactNode } from 'react';
import { TextStyle, Text as ReactText } from 'react-native';
import styles from './Text.styles';

type TextPropTypes = {
	numberOfLines?: number;
	style?: TextStyle;
	center?: boolean;
	noPadding?: boolean;
	children: ReactNode;
};

export const Text = (props: TextPropTypes) => {
	return (
		<ReactText
			{...props}
			style={{
				...styles.P,
				textAlign: props.center ? 'center' : 'auto',
				paddingBottom: props.noPadding ? 0 : 8,
				...props.style,
			}}
		>
			{props.children}
		</ReactText>
	);
};

export const B = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.B, ...props.style }}>
		{props.children}
	</Text>
);
export const H1 = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.H1, ...props.style }}>
		{props.children}
	</Text>
);
export const H2 = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.H2, ...props.style }}>
		{props.children}
	</Text>
);
export const H3 = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.H3, ...props.style }}>
		{props.children}
	</Text>
);
export const H4 = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.H4, ...props.style }}>
		{props.children}
	</Text>
);
export const Label = (props: TextPropTypes) => (
	<H3 {...props} style={{ ...styles.label, ...props.style }}>
		{props.children}
	</H3>
);
export const Error = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.Error, ...props.style }}>
		{props.children}
	</Text>
);
export const Placeholder = (props: TextPropTypes) => (
	<Text {...props} style={{ ...styles.Placeholder, ...props.style }}>
		{props.children}
	</Text>
);
