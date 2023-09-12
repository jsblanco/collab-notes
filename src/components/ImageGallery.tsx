import { useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { DbImage } from '@app/models/DbImage.models';
import { H1, shadow } from '@app/ui';

const ImageGallery = ({ images }: { images: DbImage[] }) => {
	const renderItem = useCallback(
		({ item }: { item: DbImage }) => (
			<View style={styles.imageContainer}>
				{/* TODO - Add a placeholder while image loads */}
				<Image style={styles.image} source={{ uri: item.preview }} />
			</View>
		),
		[]
	);

	return (
		<FlatList
			data={images}
			style={styles.flatlist}
			horizontal
			pagingEnabled
			removeClippedSubviews
			windowSize={1}
			bounces={false}
			renderItem={renderItem}
			showsHorizontalScrollIndicator={false}
			keyExtractor={(value) => value.id}
		/>
	);
};

export default ImageGallery;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		borderRadius: 15,
	},
	imageContainer: {
		margin: 10,
		flex: 1,
		width: Dimensions.get('window').width - 20,
		height: 300,
		...shadow,
		paddingHorizontal: 10,
	},
	flatlist: {
		paddingBottom: 20,
	},
});
