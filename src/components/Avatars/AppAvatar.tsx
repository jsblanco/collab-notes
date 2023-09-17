import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@app/models';
import { colors, IconNames, Text } from '@app/ui';
import styles from './avatars.styles';

const AppAvatar = ({
	i = 0,
	big = false,
	overlap = false,
}: {
	i?: number;
	big?: boolean;
	overlap?: boolean;
}) => {
	return (
		<View
			style={{
				...styles.userAvatar,
				...styles.appAvatar,
				...(big ? { ...styles.big, ...styles.bigText } : styles.text),
				...(overlap && { marginLeft: -10, zIndex: -i }),
			}}>
			<Ionicons name={IconNames.cog} color={colors.white} size={28} />
		</View>
	);
};

export default AppAvatar;
