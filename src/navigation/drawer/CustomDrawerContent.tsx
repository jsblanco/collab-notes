import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { List } from '../../models/List/List';
import { fetchLists } from '../../store/lists/lists.actions';
import { useNavigation } from '@react-navigation/native';
import { DrawerStackRoutes, ListStackRoutes } from '../NavigationTypes';
import { Button } from '../../ui/libUi';

const CustomDrawerContent = (props: any) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const lists = useSelector((state: RootState) => state.lists.lists);
	const error = useSelector((state: RootState) => state.lists.error);

	const loadLists = useCallback(
		async () => await dispatch(fetchLists.request()),
		[dispatch]
	);

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
			{lists?.map((list: List) => (
				<Button
					key={list.id}
					onPress={() =>
						//@ts-ignore
						navigation.navigate(DrawerStackRoutes.List, {
							screen: ListStackRoutes.ListEntries,
							params: { listId: list.id },
						})
					}
				>
					{/* <Ionicons name={list.icon} color={'ccc'} size={12} /> */}
					{list.title} {list.id}
				</Button>
			))}
		</DrawerContent>
	);
};

export default CustomDrawerContent;
