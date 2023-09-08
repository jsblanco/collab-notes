import React, {
	ReactNode,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from 'react';
import {
	Dimensions,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Error, IconNames, Icons, OSButton, shadow, Text } from '@app/ui';
import {
	ADD_PICTURE,
	imageSelectorReducer,
	REMOVE_PICTURE,
} from './ImageSelector.reducer';
import SelectedImagePreview from './SelectedImagePreview';

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
			console.log(result);

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
					<Ionicons name={IconNames.camera} color={'#000'} size={20} />,
					<Ionicons name={IconNames.images} color={'#000'} size={20} />,
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
				ListFooterComponent={
					<>
						{value.length < 4 && (
							<View style={shadow}>
								<OSButton style={styles.imagePreview} onPress={chooseImageOrigin}>
									<Text style={styles.imagePreviewTitle}>{label}</Text>
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
		borderRadius: 10,
		marginHorizontal: 5,
		marginBottom: 20,
		overflow: 'hidden',
		alignItems: 'center',
		position: 'relative',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: Dimensions.get('window').width * 0.192,
		height: Dimensions.get('window').width * ((0.192 / 3) * 4),
	},
	imagePreviewTitle: {
		padding: 5,
		textAlign: 'center',
	},
});
