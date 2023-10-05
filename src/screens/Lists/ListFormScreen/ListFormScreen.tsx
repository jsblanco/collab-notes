import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import FormControl from '@app/components/FormControl/FormControl';
import UserSelector from '@app/components/UserSelector/UserSelector';
import { User } from '@app/models';
import {
	DrawerProps,
	DrawerRoutes,
	ListStackProps,
	ListStackRoutes,
} from '@app/router/NavigationTypes';
import { addList, RootState } from '@app/store';
import {
	colors,
	Container,
	FloatingButton,
	H2,
	IconNames,
	Label,
	Modal,
	OSButton,
	Row,
} from '@app/ui';
import { ListIconOptions } from './ListFormScreen.icons';
import { Actions, formReducer } from './ListFormScreen.reducer';

type Props =
	| StackScreenProps<DrawerProps, DrawerRoutes.NewList>
	| StackScreenProps<ListStackProps, ListStackRoutes.EditList>;

const ListFormScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;
	const [iconModalVisible, setIconModalVisible] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.auth.user);

	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => listId === list.id)
	);
	console.log(
		list?.users
			.filter((listUser) => user.id !== listUser.id)
			.map((listUser) => listUser.id)
	);

	const initialFormState = {
		inputValues: {
			title: list?.title ?? '',
			description: list?.description ?? '',
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
				title: list ? `Edit list "${list.title}"` : 'Create new list',
			}),
		[list]
	);

	const onSubmit = () => {
		if (!!formState.formIsValid) {
			dispatch(
				addList.request({
					...list,
					...formState.inputValues,
				})
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
		[formDispatch]
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
		[formDispatch]
	);

	const renderIcons = ({ item }: { item: IconNames }) => (
		<OSButton
			style={{
				...styles.iconOptions,
				...(formState.inputValues.icon === item && {
					backgroundColor: colors.primary,
				}),
			}}
			onPress={() => {
				inputHandler('icon', item, true);
				setIconModalVisible(!iconModalVisible);
			}}>
			<Ionicons
				name={item}
				color={formState.inputValues.icon === item ? colors.white : colors.black}
				size={32}
			/>
		</OSButton>
	);

	return (
		<Container style={styles.screen}>
			<Row alignItems={'flex-start'}>
				<Label style={styles.iconLabel}>Icon</Label>
				<OSButton
					style={styles.iconOptions}
					onPress={() => setIconModalVisible(!iconModalVisible)}>
					<Ionicons name={formState.inputValues.icon} color={'#000'} size={32} />
				</OSButton>
			</Row>
			<FormControl
				label={'Name'}
				value={formState.inputValues.title}
				isValid={formState.inputValidities.title}
				inputName={'title'}
				placeholder={'List name'}
				inputHandler={inputHandler}
				minLength={3}
				maxLength={30}
				required
			/>
			<FormControl
				label={'Description'}
				inputName={'description'}
				placeholder={'List description'}
				value={formState.inputValues.description}
				isValid={formState.inputValidities.description}
				inputHandler={inputHandler}
				numberOfLines={4}
				maxLength={300}
				multiline
			/>
			<UserSelector
				label={'Friends'}
				maxAmount={10}
				inputName={'users'}
				value={formState.inputValues.users}
				isValid={formState.inputValidities.users}
				userList={user.friends}
				inputHandler={userInputHandler}
				modalLabel={'Add friends to this list'}
			/>

			<Modal
				visible={iconModalVisible}
				onRequestClose={setIconModalVisible.bind(null, !iconModalVisible)}>
				<FlatList
					numColumns={4}
					data={ListIconOptions}
					renderItem={renderIcons}
					keyExtractor={(item) => item}
					contentContainerStyle={styles.iconsList}
					ListHeaderComponent={
						<H2 style={{ marginBottom: 30 }}>Choose an icon for your list</H2>
					}
				/>
			</Modal>

			<FloatingButton disabled={!formState.formIsValid} onPress={onSubmit}>
				{list ? 'Update list' : 'Create new list'}
			</FloatingButton>
		</Container>
	);
};

export default ListFormScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 20,
		width: '100%',
		position: 'relative',
	},
	iconsList: {
		alignItems: 'center',
		paddingVertical: 50,
	},
	iconOptions: {
		padding: 10,
		margin: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.grey[4],
		backgroundColor: colors.white,
		shadowColor: '#ccc',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 10,
	},
	iconLabel: {
		paddingTop: 15,
		marginRight: 30,
	},
	chosenIcon: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
});
