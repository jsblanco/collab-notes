import { StyleSheet } from 'react-native';
import { colors, fonts, shadow } from '../constants/constants';

export default StyleSheet.create({
	filterPairing: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		maxWidth: 250,
	},
	filterName: {
		fontFamily: fonts.regular,
		fontSize: 16,
	},
	buttonContainer: {
		borderRadius: 5,
		overflow: 'hidden',
		margin: 5,
	},
	buttonView: {
		backgroundColor: colors.primary,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 5,
		borderWidth: 0,
	},
	buttonText: {
		color: colors.white,
		paddingBottom: 0,
		fontFamily: fonts.regularBold,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	floatingButtonContainer: {
		overflow: 'hidden',
		borderRadius: 50,
		padding: 10,
	},
	floatingButtonContainerDefaultPosition: {
		position: 'absolute',
		zIndex: 99,
		bottom: 35,
		right: 25,
	},
	floatingButtonView: {
		...shadow,
		backgroundColor: colors.accent,
		borderRadius: 50,
		borderWidth: 0,
		padding: 15,
		// paddingTop: 20,
	},
	floatingButtonText: {
		color: 'white',
		paddingBottom: 0,
		fontFamily: fonts.regular,
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
	},
	disabledButton: {
		backgroundColor: colors.grey[4],
	},
	roundButtonContainer: {
		overflow: 'hidden',
		borderRadius: 99,
	},
	roundButtonContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40,
		width: '100%',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: colors.grey['5'],
	},
	inputPlaceholder: {
		color: 'white',
	},
	actionButtonLabel: {
		fontSize: 12,
		paddingTop: 8,
		textAlign: 'center',
	},
	closeButton: {
		backgroundColor: colors.white,
		padding: 0,
		opacity: 0.9,
		...shadow,
	},
	tooltipContainer: {
		zIndex: 2,
		position: 'relative',
	},
	tooltipMessage: {
		position: 'absolute',
		top: 20,
		right: 5,
		zIndex: 3,
		minWidth: 200,
		borderRadius: 7,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: colors.accent,
	},
});
