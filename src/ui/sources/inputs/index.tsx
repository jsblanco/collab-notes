import React, { PropsWithChildren, ReactNode, useState } from 'react';
import {
	Platform,
	Switch as ReactSwitch,
	StyleProp,
	TextInput,
	TextStyle,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import { colors, shadow } from '../constants/constants';
import { SvgPropsType } from '../icons';
import { B, Text } from '../text';
import styles from './Inputs.styles';

type SwitchPairing = {
	label: string;
	state: boolean;
	icon?: ReactNode;
	textStyles?: StyleSheet;
	viewStyles?: StyleSheet;
	onChange: (e: boolean) => void;
};
type ButtonPropsType = PropsWithChildren<{
	disabled?: boolean;
	position?: ViewStyle;
	textStyle?: TextStyle;
	buttonStyle?: ViewStyle;
	onPress: (...args: any[]) => any | void;
}>;
type ActionButtonType = {
	size: number;
	label: string;
	Icon: (props: SvgPropsType) => JSX.Element;
	style?: TextStyle;
	onPress: (...args: any[]) => any;
};
type RoundButtonPropsType = PropsWithChildren<{
	size?: number;
	style?: ViewStyle;
	onPress: (...args: any[]) => any;
	onLongPress?: (...args: any[]) => any;
}>;
type HeaderButtonPropsType = PropsWithChildren<{
	onPress: (...args: any[]) => any;
	size?: number;
	style?: ViewStyle;
	leftButton?: boolean;
}>;

export const OSButton: any = (
	props: PropsWithChildren<{ style: StyleProp<ViewStyle> }>
) => {
	const { style, ...other } = props;

	return Platform.OS === 'android' && Platform.Version >= 21 ? (
		<TouchableNativeFeedback {...other}>
			<View style={props.style}>{props.children}</View>
		</TouchableNativeFeedback>
	) : (
		<TouchableOpacity activeOpacity={0.6} {...other}>
			<View style={props.style}>{props.children}</View>
		</TouchableOpacity>
	);
};

export const Switch = ({
	icon,
	viewStyles,
	textStyles,
	label,
	state,
	onChange,
}: SwitchPairing) => {
	return (
		<View style={{ ...styles.filterPairing, ...viewStyles }}>
			<Text style={{ ...styles.filterName, ...textStyles }}>
				{!!icon && (
					<Text style={{ marginRight: 20 }}>
						{icon}
						{'     '}
					</Text>
				)}
				{label}
			</Text>
			<ReactSwitch
				value={state}
				onValueChange={(newValue) => onChange(newValue)}
				trackColor={{ true: colors.accent + 60, false: '#d2d2d2' }}
				thumbColor={colors.accent}
			/>
		</View>
	);
};

export const HeaderButton = ({
	children,
	onPress,
	size,
	style,
	leftButton,
}: HeaderButtonPropsType) => (
	<View style={leftButton ? { marginLeft: 10 } : { marginRight: 10 }}>
		<RoundButton onPress={onPress} style={style} size={size}>
			{children}
		</RoundButton>
	</View>
);

export const Button = ({
	position,
	onPress,
	buttonStyle,
	textStyle,
	children,
	disabled,
}: ButtonPropsType) => {
	return (
		<View style={{ ...styles.buttonContainer, ...position }}>
			<OSButton
				activeOpacity={0.6}
				onPress={onPress}
				disabled={!!disabled}
				style={[
					styles.buttonView,
					buttonStyle,
					!!disabled && styles.disabledButton,
				]}>
				<Text style={{ ...styles.buttonText, ...textStyle }}>{children}</Text>
			</OSButton>
		</View>
	);
};

export const FloatingButton = ({
	position = {},
	onPress,
	buttonStyle,
	textStyle,
	disabled,
	children,
}: ButtonPropsType) => {
	return (
		<View
			style={{
				...shadow,
				...styles.bottomButtonContainerDefaultPosition,
				...position,
			}}>
			<View style={styles.bottomButtonContainer}>
				<OSButton
					activeOpacity={0.6}
					onPress={onPress}
					disabled={disabled}
					style={{
						...styles.bottomButtonView,
						...(disabled && styles.disabledButton),
						...buttonStyle,
					}}>
					<Text style={{ ...styles.bottomButtonText, ...textStyle }}>
						{children}
					</Text>
				</OSButton>
			</View>
		</View>
	);
};

export const ActionButton = ({
	onPress,
	Icon,
	size,
	label,
}: ActionButtonType) => {
	const [textColor, setTextColor] = useState('#333');
	const [buttonColor, setButtonColor] = useState(colors.grey['5']);

	const onPressIn = () => {
		setTextColor(colors.white);
		setButtonColor(colors.primary);
		onPress();
	};

	const onPressOut = () => {
		setTextColor('#333');
		setButtonColor(colors.grey['5']);
	};

	return (
		<View>
			<View
				style={[styles.roundButtonContainer, { backgroundColor: buttonColor }]}>
				<TouchableWithoutFeedback
					onPressIn={onPressIn}
					onPressOut={onPressOut}
					style={[styles.roundButtonContent, { height: size, width: size }]}>
					<Icon size={size / 2.2} color={textColor} />
				</TouchableWithoutFeedback>
			</View>
			<B style={styles.actionButtonLabel}>{label}</B>
		</View>
	);
};

export const RoundButton = ({
	onPress,
	onLongPress,
	children,
	size,
	style,
}: RoundButtonPropsType) => {
	return (
		<View style={[styles.roundButtonContainer]}>
			<OSButton
				useForeground
				onPress={onPress}
				onLongPress={onLongPress}
				style={[
					styles.roundButtonContent,
					{
						...style,
						height: size ?? 'auto',
						width: size ?? 'auto',
					},
				]}>
				{children}
			</OSButton>
		</View>
	);
};

interface InputProps {
	style?: StyleSheet;
	placeholder: string;
	onSubmitEditing: (e: string) => void;
}

export const Input = (props: InputProps) => (
	<TextInput
		{...props}
		disableFullscreenUI={true}
		style={{ ...styles.input, ...props.style }}
		placeholder={props.placeholder}
		onSubmitEditing={(event) => props.onSubmitEditing(event.nativeEvent.text)}
	/>
);
