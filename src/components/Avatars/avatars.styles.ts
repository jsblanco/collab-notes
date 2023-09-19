import { StyleSheet } from 'react-native';
import { colors } from '@app/ui';

export default StyleSheet.create({
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
		width: 40,
		height: 40,
		borderRadius: 20,
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
