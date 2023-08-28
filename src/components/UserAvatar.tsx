import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { User } from '../models/User.models';
import { Text, colors } from '../ui/libUi';

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
	big,
}: {
	user: User;
	i?: number;
	big?: boolean;
}) => {


	return user.image ? (
		<Image
			style={[styles.userAvatar, big && styles.big]}
			source={user.image}
		/>
	) : (
		<Text
			style={{
				...styles.userAvatar,
				...styles.avatarPlaceholder,
				...(big ? { ...styles.big, ...styles.bigText } : styles.text),
				backgroundColor: placeholderColors[i % placeholderColors.length],
			}}
			noPadding
			center
		>
			{user?.name.slice(0, 1) ?? '?'}
		</Text>
	);
};

export default UserAvatar;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		minHeight: '100%',
		paddingTop: 20,
	},
	usersRow: {
		paddingHorizontal: 20,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	userAvatar: {
		height: 40,
		width: 40,
		borderRadius: 20,
		marginRight: 5,
		overflow: 'hidden',
		alignItems: 'center',
	},
	avatarPlaceholder: {
		fontWeight: 'bold',
		color: 'white',
	},
	big: {
		height: 80,
		width: 80,
		borderRadius: 40,
	},
	text: {
		fontSize: 28,
	},
	bigText: {
		fontSize: 56,
	},
});
