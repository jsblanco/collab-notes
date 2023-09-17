import React from 'react';
import { Image} from 'react-native';
import { User } from '@app/models';
import { colors, Text } from '@app/ui';
import styles from './avatars.styles';

const placeholderColors = [
	colors.accent,
	colors.general.green,
	colors.general.blue,
	colors.general.red,
	colors.general.mustard,
];

const UserAvatar = ({
	user,
	i = 0,
	big = false,
	overlap = false,
}: {
	user: User;
	i?: number;
	big?: boolean;
	overlap?: boolean;
}) => {
	return user.image ? (
		<Image style={[styles.userAvatar, big && styles.big]} source={user.image} />
	) : (
		<Text
			style={{
				...styles.userAvatar,
				...styles.avatarPlaceholder,
				...(big ? { ...styles.big, ...styles.bigText } : styles.text),
				...(overlap && { marginLeft: -10, zIndex: -i }),
				backgroundColor: placeholderColors[i % placeholderColors.length],
			}}
			noPadding
			center>
			{user?.name.slice(0, 1) ?? '?'}
		</Text>
	);
};

export default UserAvatar;
