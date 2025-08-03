import type { DbImage } from "@app/models/DbImage.models";
import { colors, IconNames, Row, shadow } from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	LayoutAnimation,
	StyleSheet,
	View,
	type ViewToken,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ImageGallery = ({ images }: { images: DbImage[] }) => {
	const renderItem = useCallback(
		({ item }: { item: DbImage }) => (
			<View style={styles.gallerySlide}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={{ uri: item.preview }} />
					<View style={styles.imagePlaceholder}>
						<Ionicons name={IconNames.image} color={colors.grey[4]} size={80} />
					</View>
				</View>
			</View>
		),
		[],
	);

	const [index, setIndex] = useState(0);
	const onViewableItemsChanged = useCallback(
		({ changed }: { changed: ViewToken[] }) => {
			typeof changed[0].index === "number" && setIndex(changed[0].index);
		},
		[],
	);

	return (
		<View style={styles.galleryContainer}>
			<FlatList
				horizontal
				data={images}
				pagingEnabled
				contentContainerStyle={styles.galleryContainer}
				windowSize={1}
				bounces={false}
				removeClippedSubviews
				renderItem={renderItem}
				keyExtractor={(value) => value.id}
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 100,
				}}
			/>
			{images.length > 1 && (
				<Row style={styles.indicatorsRow} justifyContent={"center"}>
					{images.map((img, i) => (
						<Indicator
							key={img.id}
							isOpen={
								i === index ||
								(i === images.length - 1 && index >= images.length)
							}
						/>
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
			easing: Easing.bounce,
			useNativeDriver: false,
		}).start();
	}, [isOpen, animatedWidth]);

	return <Animated.View style={[styles.indicator, { width: animatedWidth }]} />;
};

const styles = StyleSheet.create({
	image: {
		flex: 1,
		borderRadius: 15,
		zIndex: 2,
	},
	imagePlaceholder: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	imageContainer: {
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 15,
		position: "relative",
		...shadow,
	},
	gallerySlide: {
		height: 350,
		width: Dimensions.get("window").width - 20,
		paddingLeft: 30,
	},
	galleryContainer: {
		paddingBottom: 20,
		marginHorizontal: -15,
	},
	indicator: {
		margin: 3,
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: colors.accent,
		transition: "0.5s, transform 0,5s",
	},
	currentIndicator: {
		width: 25,
	},
	indicatorsRow: {
		flexWrap: "wrap",
		paddingHorizontal: 20,
	},
});
