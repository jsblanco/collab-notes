import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
	colors,
	FloatingButton,
	IconNames,
	shadow,
} from '@app/ui';
import { ImagePreviewType } from './ImageSelector';

const SelectedImagePreview = ({
	item,
	removePicture,
}: {
	item: ImagePreviewType;
	removePicture: () => void;
}) => {
	return (
		<View style={shadow}>
			<View style={styles.imagePreview}>
				<FloatingButton
					buttonStyle={styles.deleteButton}
					onPress={removePicture}
					position={{ top: 5, right: 5 }}>
					{/* <RoundButton size={20} onPress={removePicture}> */}
					<Ionicons size={16} color={colors.grey[3]} name={IconNames.close} />
					{/* </RoundButton> */}
				</FloatingButton>
				{!!item.preview && (
					<Image style={styles.image} source={{ uri: item.preview }} />
				)}
			</View>
		</View>
	);
};

export default SelectedImagePreview;

const styles = StyleSheet.create({
	imagePreview: {
		...shadow,
		borderRadius: 10,
		marginHorizontal: 5,
		marginBottom: 20,
		overflow: 'hidden',
		alignItems: 'center',
		position: 'relative',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: Dimensions.get('window').width * ((0.192 / 3) * 4),
		height: Dimensions.get('window').width * ((0.192 / 3) * 4),
	},
	imagePreviewTitle: {
		padding: 5,
		textAlign: 'center',
	},
	deleteButton: {
		// top: 5,
		// right: 5,
		// zIndex: 5,
		// position: 'absolute',
		backgroundColor: colors.white,
		padding: 0,
		opacity: 0.9,
		...shadow,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
