import React, {
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { User } from '@app/models';
import { Error, Label, Text } from '@app/ui';
import UserAvatar from '../Avatars/UserAvatar';
import {
	ImageSelectorActions,
	imageSelectorReducer,
} from './UserSelector.reducer';

type UserSelectorPropsType = {
	label: string | ReactNode;
	maxAmount: number;
	inputName: string;
	value: User[];
	required?: boolean;
	isValid: boolean;
	headercomponent: ReactElement;
	inputHandler: (key: string, value: string[], isValid: boolean) => void;
};

const UserSelector = (props: UserSelectorPropsType) => {
	const {
		label,
		inputHandler,
		headercomponent,
		inputName,
		value,
		isValid,
		maxAmount,
		required,
	} = props;
	const [error, setError] = useState('');
	const [state, dispatch] = useReducer(imageSelectorReducer, {
		value: value ? value.map((user) => user.id) : [],
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

	const selectUserHandler = useCallback(
		async (user: User) => {
			state.value.includes(user.id)
				? dispatch({
						type: ImageSelectorActions.REMOVE_USER,
						value: user.id,
						isValid: required ? state.value.length > 1 : true,
				  })
				: dispatch({
						type: ImageSelectorActions.ADD_USER,
						value: user.id,
						isValid: true,
				  });
		},
		[ImagePicker, dispatch]
	);

	const renderItem = useCallback(
		({ item, index }: { item: User; index: number }) => {
			return (
				<Pressable onPress={() => selectUserHandler(item)}>
					<UserAvatar big user={item} i={index} />
					<Text center>{item.name}</Text>
				</Pressable>
			);
		},
		[]
	);

	return (
		<View style={styles.screen}>
			<FlatList
				data={value}
				style={styles.flatlist}
				contentContainerStyle={styles.flatlistContentContainer}
				columnWrapperStyle={styles.columnWrapper}
				numColumns={3}
				renderItem={renderItem}
				keyExtractor={(value) => value.id}
				showsHorizontalScrollIndicator={false}
				ListHeaderComponent={
					<>
						{headercomponent}
						<Label style={styles.label}>{label}</Label>
					</>
				}
			/>
			{!!error && <Error>{error}</Error>}
		</View>
	);
};

export default UserSelector;

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		alignItems: 'center',
	},
	flatlist: {
		width: '100%',
		paddingBottom: 100,
		paddingHorizontal: 20,
	},
	flatlistContentContainer: {
		paddingBottom: 100,
	},
	columnWrapper: {
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	label: {
		paddingTop: 20,
	},
});
