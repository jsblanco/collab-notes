import type { User } from "@app/models";
import {
	CloseButton,
	colors,
	ErrorMessage,
	H2,
	IconNames,
	Label,
	Modal,
	OSButton,
	shadow,
	Text,
} from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useReducer,
	useState,
} from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserAvatar from "../Avatars/UserAvatar";
import {
	ImageSelectorActions,
	imageSelectorReducer,
} from "./UserSelector.reducer";

type UserSelectorPropsType = {
	label: string | ReactNode;
	maxAmount: number;
	inputName: string;
	value: User[];
	userList: User[];
	modalLabel: string | ReactNode;
	required?: boolean;
	isValid: boolean;
	inputHandler: (key: string, value: User[], isValid: boolean) => void;
};

const UserSelector = (props: UserSelectorPropsType) => {
	const {
		label,
		value,
		isValid,
		required,
		userList,
		inputName,
		maxAmount,
		modalLabel,
		inputHandler,
	} = props;
	const [error, _] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [state, dispatch] = useReducer(imageSelectorReducer, {
		value: value ? value : [],
		isValid: required ? isValid : true,
		isTouched: false,
	});
	const unselectedUsers = userList.filter(
		(user) =>
			value.findIndex((selectedUser) => user.id === selectedUser.id) === -1,
	);

	useEffect(() => {
		inputHandler(inputName, state.value, state.isValid);
	}, [inputHandler, state.value, state.isValid, inputName]);

	useEffect(() => {
		if (state.value.length > 0 && value.length === 0) {
			dispatch({ type: ImageSelectorActions.FORM_RESET });
		}
	}, [value, state.value]);

	const onAddUser = useCallback(
		(user: User) =>
			dispatch({
				type: ImageSelectorActions.ADD_USER,
				value: user,
				isValid: required ? state.value.length > 1 : true,
			}),
		[state.value.length, required],
	);

	const onRemoveUser = useCallback(
		(user: User) =>
			dispatch({
				type: ImageSelectorActions.REMOVE_USER,
				value: user,
				isValid: required ? state.value.length > 1 : true,
			}),
		[required, state.value.length],
	);

	const renderSelectedUserAvatars = useCallback(
		({ item, index }: { item: User | 0; index: number }) =>
			item === 0 ? (
				<View style={styles.addUserButton}>
					<OSButton
						style={styles.userPreview}
						onPress={() => setModalVisible(true)}
					>
						<Ionicons
							name={IconNames.person}
							color={colors.grey[3]}
							size={32}
						/>
					</OSButton>
					<Text noPadding style={styles.userPreviewTitle}>
						Add user
					</Text>
				</View>
			) : (
				<View>
					<CloseButton onRequestClose={onRemoveUser.bind(null, item)} />
					<UserAvatar big user={item} i={index} />
					<Text center>{item.name}</Text>
				</View>
			),
		[onRemoveUser.bind],
	);

	const renderUserAvatars = useCallback(
		({ item, index }: { item: User; index: number }) => (
			<OSButton
				onPress={() => {
					onAddUser(item);
					setModalVisible(false);
				}}
			>
				<UserAvatar big user={item} i={index} />
				<Text center>{item.name}</Text>
			</OSButton>
		),
		[onAddUser],
	);

	return (
		<>
			<Label style={styles.label}>{label} </Label>
			<FlatList
				data={
					value.length < maxAmount && unselectedUsers.length > 0
						? [0, ...value]
						: value
				}
				// horizontal
				numColumns={3}
				style={styles.flatlist}
				columnWrapperStyle={styles.columnWrapper}
				renderItem={renderSelectedUserAvatars}
				keyExtractor={(value) => (value as User).id ?? "picker"}
				showsHorizontalScrollIndicator={false}
			/>

			{!!error && <ErrorMessage>{error}</ErrorMessage>}

			<Modal
				visible={modalVisible}
				onRequestClose={setModalVisible.bind(null, !modalVisible)}
			>
				<H2 center style={{ paddingTop: 40 }}>
					{modalLabel}
				</H2>
				<FlatList
					numColumns={4}
					data={unselectedUsers}
					renderItem={renderUserAvatars}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.usersModal}
					columnWrapperStyle={styles.columnWrapper}
				/>
			</Modal>
		</>
	);
};

export default UserSelector;

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		alignItems: "center",
	},
	flatlist: {
		width: "100%",
	},
	columnWrapper: {
		gap: 25,
		paddingVertical: 5,
		paddingHorizontal: 20,
	},
	label: {
		paddingTop: 20,
	},
	usersModal: {
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 100,
	},
	addUserButton: {
		...shadow,
	},
	userPreview: {
		overflow: "hidden",
		alignItems: "center",
		position: "relative",
		justifyContent: "center",
		backgroundColor: "white",
		height: 80,
		width: 80,
		borderRadius: 40,
	},
	userPreviewTitle: {
		textAlign: "center",
	},
});
