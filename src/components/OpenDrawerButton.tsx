import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { IconNames, colors } from '@app/ui';

const OpenDrawerButton = () => {
	const navigation = useNavigation();

	return (
		<Pressable
			//@ts-ignore
			onPress={navigation.toggleDrawer}>
			<Ionicons
				name={IconNames.hamburgerMenu}
				color={colors.primary}
				size={28}
				style={{ marginLeft: 10 }}
			/>
		</Pressable>
	);
};

export default OpenDrawerButton;
