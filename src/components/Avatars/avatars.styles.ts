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
		height: 40,
		width: 40,
		borderRadius: 20,
		marginRight: 5,
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
