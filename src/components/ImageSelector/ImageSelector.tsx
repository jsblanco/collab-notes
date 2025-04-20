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
import { DbImage } from '@app/models/DbImage.models';
import { uploadImage } from '@app/store/lists/lists.queries';
import {
	CloseButton,
	colors,
	Error,
	IconNames,
	OSButton,
	shadow,
	Text,
} from '@app/ui';
import {
	ImageSelectorActions,
	imageSelectorReducer,
} from './ImageSelector.reducer';

type ImageSelectorPropsType = {
	label: string | ReactNode;
	maxAmount: number;
	inputName: string;
	value: DbImage[];
	required?: boolean;
	isValid: boolean;
	inputHandler: (key: string, value: DbImage[], isValid: boolean) => void;
};

export enum ImageSources {
	CAMERA = 'launchCameraAsync',
	GALLERY = 'launchImageLibraryAsync',
}

const ImageSelector = (props: ImageSelectorPropsType) => {
	const { label, inputHandler, inputName, value, isValid, maxAmount, required } =
		props;
	const { showActionSheetWithOptions } = useActionSheet();
	const [error, setError] = useState('');
	const [state, dispatch] = useReducer(imageSelectorReducer, {
		value: value ? value : [],
		isValid: required ? isValid : true,
		isTouched: false,
	});

	useEffect(() => {
		inputHandler(inputName, state.value, state.isValid);
	}, [inputHandler, state, value]);

	useEffect(() => {
		if (state.value.length > 0 && value.length === 0) {
			dispatch({ type: ImageSelectorActions.FORM_RESET });
		}
	}, [value]);

	const getImageHandler = useCallback(
		async (origin: 'launchCameraAsync' | 'launchImageLibraryAsync') => {
			setError('');
			if (
				origin === ImageSources.CAMERA &&
				(!ImagePicker.getCameraPermissionsAsync() ||
					!ImagePicker.requestCameraPermissionsAsync())
			)
				return;

			const result = await ImagePicker[origin]({
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.6,
			});
			if (result.canceled) return;

			const uploadedImage = uploadImage(result.assets[0]);
			if (!uploadedImage) return setError('Could not upload your image');

			dispatch({
				type: ImageSelectorActions.ADD_PICTURE,
				value: uploadedImage,
				isValid: true,
			});
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

	const renderItem = useCallback(
		({ item }: { item: DbImage }) => (
			<SelectedImagePreview
				item={item}
				removePicture={removePicture.bind(this, item.id)}
			/>
		),
		[]
	);

	const removePicture = (id: string) => {
		dispatch({
			type: ImageSelectorActions.REMOVE_PICTURE,
			value: id,
			isValid: required ? state.value.length > 1 : true,
		});
	};

	return (
		<View style={styles.screen}>
			<FlatList
				data={value}
				horizontal={true}
				style={styles.flatlist}
				renderItem={renderItem}
				keyExtractor={(value) => value.id}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponent={
					<>
						{value.length < maxAmount && (
							<View style={shadow}>
								<OSButton style={styles.imagePreview} onPress={chooseImageOrigin}>
									<Ionicons name={IconNames.image} color={colors.grey[3]} size={26} />
									<Text noPadding style={styles.imagePreviewTitle}>
										{label}
									</Text>
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
	item: DbImage;
	removePicture: () => void;
}) => {
	return (
		<View style={shadow}>
			<View style={styles.imagePreview}>
				<CloseButton onRequestClose={removePicture} />
				{!!item.preview && (
					<Image style={styles.image} source={{ uri: item.preview }} />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingVertical: 10,
		alignItems: 'center',
	},
	flatlist: {
		flex: 1,
		paddingHorizontal: 10,
	},
	imagePreview: {
		...shadow,
		borderRadius: 10,
		marginHorizontal: 5,
		marginVertical: 10,
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
		color: colors.grey[3],
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
