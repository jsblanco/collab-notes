import React from 'react';
import { Image, View } from 'react-native';
import { User } from '@app/models';
import { colors, shadow, Text } from '@app/ui';
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
	selected,
	i = 0,
	big = false,
	overlap = false,
}: {
	user: User;
	selected?: boolean;
	i?: number;
	big?: boolean;
	overlap?: boolean;
}) => {
	return (
		<View
			style={{
				...styles.wrapper,
				...(selected && styles.selected),
				...(big ? styles.big : styles.small),
				...(overlap && { marginLeft: -10, zIndex: -i }),
			}}>
			{user.image ? (
				<Image
					style={[styles.userAvatar, big ? styles.big : styles.small]}
					source={user.image}
				/>
			) : (
				<Text
					style={{
						...(big
							? { ...styles.big, ...styles.bigText }
							: { ...styles.small, ...styles.text }),
						...styles.userAvatar,
						...styles.avatarPlaceholder,

						backgroundColor: placeholderColors[i % placeholderColors.length],
					}}
					noPadding
					center>
					{user?.name.slice(0, 1) ?? '?'}
				</Text>
			)}
		</View>
	);
};

export default UserAvatar;
