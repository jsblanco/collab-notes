import { StyleSheet } from 'react-native';
import { colors, shadow } from '@app/ui';

export default StyleSheet.create({
	usersRow: {
		paddingHorizontal: 20,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	userAvatar: {
		overflow: 'hidden',
		alignItems: 'center',
	},
	appAvatar: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.grey[3],
	},
	avatarPlaceholder: {
		fontWeight: 'bold',
		color: 'white',
	},
	selected: {
		borderRadius: 50,
		borderWidth: 3,
		borderColor: colors.primary,
		padding: 3,
	},
	wrapper: {
		marginRight: 5,
		maxWidth: 80,
		backgroundColor: 'white',
		borderRadius: 99,
		...shadow,
	},
	small: {
		width: 40,
		height: 40,
		borderRadius: 20,
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
