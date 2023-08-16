import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	ImageBackground,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { List } from '../../models/List/List';
import { fetchAllLists } from '../../store/lists/lists.actions';
import { useNavigation } from '@react-navigation/native';
import { DrawerRoutes, ListStackRoutes } from '../NavigationTypes';
import { Button } from '../../ui/libUi';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { lists, error } = useSelector((state: RootState) => state.lists);
	const [isLoading, setIsLoading] = useState(false);
	const [currentRoute, setCurrentRoute] = useState<any>();

	const loadLists = useCallback(
		async () => await dispatch(fetchAllLists.request()),
		[dispatch]
	);

	useEffect(() => {
		setCurrentRoute(props.state.routes[props.state.index]);
	}, [props.state.routes, props.state.index]);

	useEffect(() => {
		setIsLoading(true);
		loadLists().then(() => setIsLoading(false));
	}, [dispatch, loadLists]);

	const DrawerContent = ({ children }: { children: React.ReactNode }) => (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{
					backgroundColor: '#8200d6',
				}}
			>
				<ImageBackground
					source={require('../../assets/images/bg.png')}
					style={{ padding: 20, paddingTop: 100, marginTop: -80 }}
				>
					<Image
						source={require('../../assets/images/profile.png')}
						style={{
							height: 80,
							width: 80,
							borderRadius: 40,
							marginBottom: 10,
						}}
					/>
					<Text
						style={{
							color: '#fff',
							fontSize: 18,
							fontFamily: 'openSans',
							marginBottom: 5,
						}}
					>
						Jorgito
					</Text>
				</ImageBackground>

				<View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
					<DrawerItemList {...props} />
					{children}
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name='share-social-outline' size={22} />
						<Text
							style={{
								fontSize: 15,
								fontFamily: 'openSans',
								marginLeft: 5,
							}}
						>
							Tell a Friend
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name='exit-outline' size={22} />
						<Text
							style={{
								fontSize: 15,
								fontFamily: 'openSans',
								marginLeft: 5,
							}}
						>
							Sign Out
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);

	if (!!error || isLoading || (!isLoading && lists.length === 0))
		return (
			<DrawerContent>
				<Text>Loading lists...</Text>
			</DrawerContent>
		);

	return (
		<DrawerContent>
			{lists?.map((list: List) => {
				const isSelectedListRoute =
					currentRoute &&
					(currentRoute?.name !== DrawerRoutes.List ||
						list.id !== currentRoute?.params?.params?.listId);

				return (
					<Button
						key={list.id}
						buttonStyle={{
							...styles.navButton,
							...(isSelectedListRoute && styles.navButtonIdle),
						}}
						textStyle={{
							...(isSelectedListRoute && styles.navButtonIdle),
						}}
						onPress={() =>
							//@ts-ignore
							navigation.navigate(DrawerRoutes.List, {
								screen: ListStackRoutes.ListTasks,
								params: { listId: list.id },
							})
						}
					>
						<Ionicons name={list.icon} color={'#ccc'} size={12} />
						{list.title} {list.id}
					</Button>
				);
			})}
		</DrawerContent>
	);
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
	navButton: {
		alignItems: 'flex-start',
	},
	navButtonIdle: {
		backgroundColor: 'white',
		color: 'black',
	},
});
