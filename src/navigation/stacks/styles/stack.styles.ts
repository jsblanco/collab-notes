import { colors, fonts } from '../../../ui/libUi';

const styles = {
	headerStyle: {
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 0,
		backgroundColor: colors.background,
	},
	headerTintColor: colors.primary,
	headerTitleStyle: {
		color: colors.primary,
		fontWeight: '900',
		fontFamily: fonts.regularBold,
		alignSelf: 'center',
	},
	headerBackTitleStyle: {
		fontFamily: fonts.regular,
	},
};

export default styles;
