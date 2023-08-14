import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ListStack } from './stacks/ListStack';
import { colors, fonts } from '../ui/libUi';
import CustomDrawerContent from '../components/CustomDrawerContent';
import {
	DrawerStackProps,
	DrawerStackRoutes,
	getDrawerListLink,
} from './NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { List } from '../models/List/List';
import { AuthStack } from './stacks/AuthStack';
import { fetchLists } from '../store/lists/lists.actions';

const Drawer = createDrawerNavigator<DrawerStackProps>();

export function DrawerNavigation() {
	const dispatch = useDispatch();
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

	const DrawerContent = ({ children }: { children?: ReactNode }) => (
		<Drawer.Navigator
			initialRouteName={DrawerStackRoutes.Lists}
			screenOptions={{
				drawerActiveBackgroundColor: colors.primary,
				drawerActiveTintColor: '#fff',
				drawerInactiveTintColor: '#333',
				drawerLabelStyle: {
					marginLeft: -25,
					fontFamily: 'openSans',
					fontSize: 15,
				},
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen
				name={DrawerStackRoutes.Logout}
				component={AuthStack}
				options={{
					drawerLabel: 'TODO: Change to Create List',
					drawerIcon: ({ color, size }) => (
						<Ionicons name='document-text-outline' color={color} size={size} />
					),
				}}
			/>
			{children}
		</Drawer.Navigator>
	);

	if (!!error || isLoading || (!isLoading && lists.length === 0))
		return <DrawerContent />;

	return (
		<DrawerContent>
			<Drawer.Group>
				{lists?.map((list: List) => (
					<Drawer.Screen
						key={list.id}
						component={ListStack}
						name={getDrawerListLink(list.id)}
						initialParams={{ listId: list.id }}
						options={{
							headerShown: false,
							title: list.title,
							drawerLabel: list.title,
							drawerItemStyle: { paddingLeft: 15, paddingRight: -5 },
							drawerIcon: ({ color, size }) => (
								//@ts-ignore
								<Ionicons name={list.icon} color={color} size={size} />
							),
						}}
					/>
				))}
			</Drawer.Group>
		</DrawerContent>
	);
}
