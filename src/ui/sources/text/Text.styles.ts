import { StyleSheet } from "react-native";
import { colors, fonts } from "../constants/constants";

export default StyleSheet.create({
	H1: {
		fontFamily: fonts.regularBold,
		marginBottom: 20,
		lineHeight: 32,
		fontSize: 28,
	},
	H2: {
		fontFamily: fonts.regularBold,
		lineHeight: 30,
		fontSize: 22,
	},
	H3: {
		fontFamily: fonts.regularBold,
		lineHeight: 24,
		fontSize: 18,
	},
	H4: {
		fontFamily: fonts.regularBold,
		lineHeight: 24,
		fontSize: 16,
	},
	P: {
		fontFamily: fonts.regular,
		color: colors.text.regular,
		fontSize: 14,
	},
	B: {
		fontFamily: fonts.regularBold,
	},
	label: {
		fontFamily: fonts.regular,
		marginTop: 10,
	},
	Error: {
		width: "100%",
		fontSize: 14,
		lineHeight: 21,
		borderRadius: 8,
		paddingTop: 6,
		paddingBottom: 4,
		paddingHorizontal: 8,
		color: colors.danger,
		fontFamily: fonts.regularBold,
	},
	Placeholder: {
		fontSize: 20,
		lineHeight: 28,
		color: colors.grey["3"],
		fontFamily: fonts.regularBold,
	},
});
