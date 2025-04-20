import { Dimensions, StyleSheet } from 'react-native';
import { colors, shadow } from '../constants/constants';

export default StyleSheet.create({
	card: {
		margin: 10,
		borderRadius: 15,
		padding: 15,
		backgroundColor: colors.white,
		...shadow,
	},
	modalView: {
		marginHorizontal: 10,
		marginTop: 100,
		paddingTop: 10,
		borderTopStartRadius: 25,
		borderTopEndRadius: 25,
		alignItems: 'center',
		backgroundColor: 'white',
		height: '100%',
		flex: 1,
	},
	flatlistHeader: {
		height: 50,
		alignItems: 'center',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		backgroundColor: colors.background,
		...shadow,
	},
	draggableIndicator: {
		width: Dimensions.get('window').width * 0.25,
		height: 4,
		marginTop: 15,
		borderRadius: 2,
		backgroundColor: '#ddd',
	},
	flatlistBackground: {
		height: Dimensions.get('window').height - 299,
	},
	inlineBlock: {
		flex: 1,
	},
	row: {
		width: '100%',
		flexDirection: 'row',
	},
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	alignCenter: {
		alignItems: 'center',
	},
	justifyCenter: {
		justifyContent: 'center',
	},
	separator: {
		width: '100%',
		marginVertical: 30,
		borderBottomWidth: 2,
		borderColor: colors.grey['5'],
	},
	description: {
		padding: 20,
		paddingBottom: 15,
		marginVertical: 20,
		backgroundColor: colors.grey[5],
		borderRadius: 10,
		alignContent: 'flex-start',
		zIndex: 2,
	},
});
