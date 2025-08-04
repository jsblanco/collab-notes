import FormControl from "@app/components/FormControl/FormControl";
import UserSelector from "@app/components/UserSelector/UserSelector";
import type { User } from "@app/models";
import type {
	DrawerProps,
	DrawerRoutes,
} from "@app/router/drawer/DrawerNavigation.types";
import type {
	ListStackProps,
	ListStackRoutes,
} from "@app/router/stacks/ListStack.types";
import { addList, type RootState } from "@app/store";
import {
	Card,
	Container,
	colors,
	FloatingButton,
	H2,
	type IconNames,
	Label,
	Modal,
	OSButton,
	Row,
} from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import type { StackScreenProps } from "@react-navigation/stack";
import { useCallback, useEffect, useReducer, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { ListIconOptions } from "./ListFormScreen.icons";
import { Actions, formReducer } from "./ListFormScreen.reducer";

type Props =
	| StackScreenProps<DrawerProps, DrawerRoutes.NewList>
	| StackScreenProps<ListStackProps, ListStackRoutes.EditList>;

const ListFormScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params ?? {};
	const [iconModalVisible, setIconModalVisible] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.auth.user);

	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => listId === list.id),
	);

	const initialFormState = {
		inputValues: {
			title: list?.title ?? "",
			description: list?.description ?? "",
			icon:
				list?.icon ??
				ListIconOptions[Math.floor(Math.random() * ListIconOptions.length)],
			users: list?.users.length ? list.users : [],
		},
		inputValidities: {
			title: !!list,
			description: true,
			icon: true,
			users: true,
		},
		formIsValid: !!list,
	};

	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(formReducer, initialFormState);

	useEffect(
		() =>
			navigation.setOptions({
				title: list ? `Edit list "${list.title}"` : "Create new list",
			}),
		[list, navigation.setOptions],
	);

	const onSubmit = () => {
		if (formState.formIsValid) {
			dispatch(
				addList.request({
					...list,
					...formState.inputValues,
				}),
			);
			formDispatch({ type: Actions.FORM_RESET });
		}
		//@ts-ignore
		navigation.goBack();
	};

	const inputHandler = useCallback(
		(key: string, value: string, isValid: boolean) => {
			formDispatch({
				type: Actions.FORM_UPDATE,
				value: value,
				isValid: isValid,
				input: key,
			});
		},
		[],
	);

	const userInputHandler = useCallback(
		(key: string, value: User[], isValid: boolean) => {
			formDispatch({
				type: Actions.FORM_ARRAY_UPDATE,
				value: value,
				isValid: isValid,
				input: key,
			});
		},
		[],
	);

	const renderIcons = ({ item }: { item: IconNames }) => (
		<OSButton
			style={[
				styles.iconOptions,
				formState.inputValues.icon === item && styles.chosenIcon,
			]}
			onPress={() => {
				inputHandler("icon", item, true);
				setIconModalVisible(!iconModalVisible);
			}}
		>
			<Ionicons
				name={item}
				size={32}
				color={
					formState.inputValues.icon === item ? colors.white : colors.black
				}
			/>
		</OSButton>
	);

	return (
		<ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
			<Card>
				<Row justifyContent={"flex-start"} alignItems={"flex-start"} gap={24}>
					<Label>Icon</Label>
					<OSButton
						style={styles.iconOptions}
						onPress={() => setIconModalVisible(!iconModalVisible)}
					>
						<Ionicons
							name={formState.inputValues.icon}
							color={"#000"}
							size={32}
						/>
					</OSButton>
				</Row>
				<FormControl
					label={"Name"}
					value={formState.inputValues.title}
					isValid={formState.inputValidities.title}
					inputName={"title"}
					placeholder={"List name"}
					inputHandler={inputHandler}
					minLength={3}
					maxLength={30}
					required
				/>
				<FormControl
					label={"Description"}
					inputName={"description"}
					placeholder={"List description"}
					value={formState.inputValues.description}
					isValid={formState.inputValidities.description}
					inputHandler={inputHandler}
					numberOfLines={4}
					maxLength={300}
					multiline
				/>
				<UserSelector
					label={"Friends"}
					maxAmount={10}
					inputName={"users"}
					value={formState.inputValues.users}
					isValid={formState.inputValidities.users}
					userList={user.friends}
					inputHandler={userInputHandler}
					modalLabel={"Add friends to this list"}
				/>
			</Card>
			<Modal
				visible={iconModalVisible}
				onRequestClose={setIconModalVisible.bind(null, !iconModalVisible)}
			>
				<FlatList
					numColumns={4}
					data={ListIconOptions}
					renderItem={renderIcons}
					columnWrapperStyle={styles.iconGap}
					keyExtractor={(item) => item}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[styles.iconsList, styles.iconGap]}
					ListHeaderComponent={<H2>Choose an icon for your list</H2>}
				/>
			</Modal>
			{/*TODO - Fix button position*/}
			<FloatingButton disabled={!formState.formIsValid} onPress={onSubmit}>
				{list ? "Update list" : "Create new list"}
			</FloatingButton>
		</ScrollView>
	);
};

export default ListFormScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		card: 10,
		width: "100%",
		padding: 16,
		position: "relative",
		backgroundColor: "#e2e2e2",
		paddingBottom: 120,
	},
	iconGap: {
		gap: 16,
	},
	iconsList: {
		alignItems: "center",
		paddingVertical: 30,
	},
	iconOptions: {
		padding: 10,
		card: 10,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: colors.grey[4],
		backgroundColor: colors.white,
		shadowColor: "#ccc",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 10,
	},

	chosenIcon: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
});
