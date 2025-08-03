import { colors, fonts, shadow } from "../../ui";

const styles = {
	headerStyle: {
		backgroundColor: colors.primary,
		...shadow,
	},
	headerTintColor: colors.white,
	headerTitleStyle: {
		color: colors.white,
		fontWeight: "900",
		fontFamily: fonts.regularBold,
		alignSelf: "center",
	},
	headerBackTitleStyle: {
		fontFamily: fonts.regular,
	},
};

export default styles;
