import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
	},
	button: {
		width: 75,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'green',
	},
	buttonText: {
		padding: 0,
		color: '#fff',
	},

	// Draggable flatlist
	rowItem: {
        flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	// Draggable flatlist
	text: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
