import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Modal, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import FormControl from '@app/components/FormControl/FormControl';
import { DrawerProps, DrawerRoutes, ListStackProps, ListStackRoutes } from '@app/router/NavigationTypes';
import { addList, RootState } from '@app/store';
import {
	Button,
	Container,
	FloatingButton,
	IconNames,
	Label,
	Row,
	Text,
} from '@app/ui';
import { ListIconOptions } from './ListFormScreen.icons';
import { Actions, formReducer } from './ListFormScreen.reducer';

type Props = StackScreenProps<DrawerProps, DrawerRoutes.NewList>;

const ListFormScreen = ({ route, navigation }: Props): JSX.Element => {
	const { listId } = route.params;
	const [iconModalVisible, setIconModalVisible] = useState<boolean>(false);
	const list = useSelector((state: RootState) =>
		state.lists.lists.find((list) => listId === list.id)
	);

	const initialFormState = {
		inputValues: {
			title: list?.title ?? '',
			icon:
				list?.icon ??
				ListIconOptions[Math.floor(Math.random() * ListIconOptions.length)],
			users: list?.users.map((user) => user.id) ?? [],
		},
		inputValidities: {
			title: !!list,
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

	const renderIcons = ({ item }: { item: IconNames }) => (
		<TouchableOpacity
			style={styles.iconOptions}
			onPress={() => {
				inputHandler('icon', item, true);
				setIconModalVisible(!iconModalVisible);
			}}>
			<Ionicons name={item} color={'#000'} size={32} />
		</TouchableOpacity>
	);

	return (
		<Container style={styles.screen}>
			<Row style={{ alignItems: 'flex-start' }}>
				<Label>Icon</Label>
				<TouchableOpacity
					style={styles.chosenIcon}
					onPress={() => setIconModalVisible(!iconModalVisible)}>
					<Ionicons name={formState.inputValues.icon} color={'#000'} size={32} />
				</TouchableOpacity>
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
			<Modal
				animationType="slide"
				// transparent={true}
				style={{ marginHorizontal: 40, marginVertical: 70, alignItems: 'center' }}
				visible={iconModalVisible}
				onRequestClose={() => {
					setIconModalVisible(!iconModalVisible);
				}}>
					
				<FlatList
					data={ListIconOptions}
					renderItem={renderIcons}
					contentContainerStyle={{alignItems: 'center', paddingVertical: 50}}
					numColumns={4}
					keyExtractor={(item, index) => item}
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
	chosenIcon: {
		padding: 10,
		margin: 0,
		marginLeft: 50,
		borderRadius: 5,
		borderWidth: 1,
	},
	iconOptions: {
		padding: 10,
		margin: 10,
		borderRadius: 5,
		borderWidth: 1,
	},
});
