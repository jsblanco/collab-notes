import React, {
	ReactNode,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
	colors,
	Error,
	FloatingButton,
	IconNames,
	OSButton,
	shadow,
	Text,
} from '@app/ui';
import {
	ADD_PICTURE,
	imageSelectorReducer,
	REMOVE_PICTURE,
} from './ImageSelector.reducer';

type ImageSelectorPropsType = {
	label: string | ReactNode;
	inputName: string;
	value: string[];
	isValid: boolean;
	inputHandler: (key: string, value: string[], isValid: boolean) => void;
};
export type ImagePreviewType = { preview: string; id: string };

export enum ImageSources {
	CAMERA = 'launchCameraAsync',
	GALLERY = 'launchImageLibraryAsync',
}

const ImageSelector = (props: ImageSelectorPropsType) => {
	const { label, inputHandler, inputName, value, isValid } = props;
	const { showActionSheetWithOptions } = useActionSheet();
	const [error, setError] = useState('');
	const [previews, setPreviews] = useState<ImagePreviewType[]>([]);
	const [state, dispatch] = useReducer(imageSelectorReducer, {
		value: value ? value : [],
		isValid: isValid,
		isTouched: false,
	});

	const getImageHandler = useCallback(
		async (origin: 'launchCameraAsync' | 'launchImageLibraryAsync') => {
			setError('');
			if (origin === ImageSources.CAMERA) {
				let permissions = ImagePicker.getCameraPermissionsAsync();
				if (!permissions) permissions = ImagePicker.requestCameraPermissionsAsync();
				if (!permissions) return;
			}

			const result = await ImagePicker[origin]({
				// const result = await ImagePicker[origin]({
				allowsEditing: true,
				aspect: [3, 4],
				quality: 0.6,
			});
			if (result.canceled) return;

			if (!result) return setError('Could not upload your image');

			// update with data fetched from backend after real BE is developed
			setPreviews((previews) => [
				...previews,
				{
					id: result.assets[0].uri,
					preview: result.assets[0].uri,
				},
			]);

			dispatch({ type: ADD_PICTURE, value: result.assets[0].uri });
		},
		[ImagePicker, dispatch]
	);

	const chooseImageOrigin = useCallback(() => {
		showActionSheetWithOptions(
			{
				options: ['Camera', 'Gallery', 'Cancel'],
				icons: [
					<Ionicons name={IconNames.camera} color={colors.black} size={20} />,
					<Ionicons name={IconNames.images} color={colors.black} size={20} />,
				],
				cancelButtonIndex: 2,
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						return getImageHandler(ImageSources.CAMERA);
					case 1:
						return getImageHandler(ImageSources.GALLERY);
				}
			}
		);
	}, [showActionSheetWithOptions, getImageHandler]);

	const renderItem = ({ item }: { item: ImagePreviewType }) => (
		<SelectedImagePreview
			item={item}
			removePicture={removePicture.bind(this, item.id)}
		/>
	);

	const removePicture = (id: string) => {
		setPreviews((previews) => previews.filter((preview) => preview.id !== id));
		dispatch({ type: REMOVE_PICTURE, value: id });
	};

	useEffect(() => {
		inputHandler(inputName, state.value, state.isValid);
	}, [inputHandler, state, value]);

	useEffect(() => {
		if (state.value.length > 0 && value.length === 0) {
			dispatch({ type: 'FORM_RESET' });
			setPreviews([]);
		}
	}, [value]);

	return (
		<View style={styles.screen}>
			<FlatList
				data={previews}
				style={styles.flatlist}
				horizontal={true}
				renderItem={renderItem}
				keyExtractor={(value) => value.id}
				ListHeaderComponent={
					<>
						{value.length < 4 && (
							<View style={shadow}>
								<OSButton style={styles.imagePreview} onPress={chooseImageOrigin}>
									<Ionicons name={IconNames.image} color={colors.grey[3]} size={26} />
									<Text noPadding style={styles.imagePreviewTitle}>{label}</Text>
								</OSButton>
							</View>
						)}
					</>
				}
			/>
			{!!error && <Error>{error}</Error>}
		</View>
	);
};

export default ImageSelector;

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

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		paddingVertical: 20,
		alignItems: 'center',
	},
	flatlist: {
		width: '100%',
		paddingHorizontal: 20,
	},
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
		color: colors.grey[3]
	},
	deleteButton: {
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
