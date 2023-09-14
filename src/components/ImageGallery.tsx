import { useCallback, useEffect, useRef, useState } from 'react';
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	LayoutAnimation,
	StyleSheet,
	View,
	ViewToken,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { DbImage } from '@app/models/DbImage.models';
import { colors, Row, shadow } from '@app/ui';

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

	const [index, setIndex] = useState(0);
	const onViewableItemsChanged = useCallback(
		({ changed }: { changed: ViewToken[] }) => {
			typeof changed[0].index === 'number' && setIndex(changed[0].index);
		},
		[setIndex]
	);

	return (
		<View style={styles.galleryContainer}>
			<FlatList
				data={images}
				horizontal
				pagingEnabled
				removeClippedSubviews
				windowSize={1}
				bounces={false}
				renderItem={renderItem}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 100,
				}}
				onViewableItemsChanged={onViewableItemsChanged}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(value) => value.id}
			/>
			{images.length > 1 && (
				<Row style={{ justifyContent: 'center' }}>
					{images.map((_, i) => (
						<Indicator key={i} isOpen={i === index} />
					))}
				</Row>
			)}
		</View>
	);
};

export default ImageGallery;

const Indicator = ({ isOpen }: { isOpen: boolean }) => {
	const [animatedWidth] = useState(new Animated.Value(isOpen ? 30 : 10));

	useEffect(() => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		Animated.timing(animatedWidth, {
			toValue: isOpen ? 30 : 10,
			duration: 50,
			useNativeDriver: false,
		}).start();
	}, [isOpen]);

	return <Animated.View style={[styles.indicator, { width: animatedWidth }]} />;
};

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
	galleryContainer: {
		paddingBottom: 30,
	},
	indicator: {
		margin: 3,
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: colors.accent,
		transition: '0.5s, transform 0,5s',
	},
	currentIndicator: {
		width: 25,
	},
});
