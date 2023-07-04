import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
	DrawerContentScrollView,
	DrawerItem,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ListStack } from './stacks/ListsStack';
import { colors } from '../ui/libUi';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import {
	DrawerListEntry,
	DrawerStackProps,
	DrawerStackRoutes,
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
	// const [isRefreshing, setIsRefreshing] = useState(false);
	const lists = useSelector((state: RootState) => state.lists.lists);
	const error = useSelector((state: RootState) => state.lists.error);

	const loadLists = useCallback(async () => {
		// setIsRefreshing(true);
		await dispatch(fetchLists.request());
		// setIsRefreshing(false);
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		loadLists().then(() => setIsLoading(false));
	}, [dispatch, loadLists]);

	const DrawerContent = ({ children }: { children?: ReactNode }) => (
		<Drawer.Navigator
			initialRouteName={DrawerStackRoutes.Lists}
			screenOptions={{}}
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
						name={ ` ${list.title} `}
						component={ListStack}
						initialParams={{ listId: list.id }}
						options={{
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

const tabBarOptions = {
	activeTintColor: colors.accent,
	style: {
		height: 75,
		paddingTop: 10,
	},
	labelStyle: {
		fontFamily: 'openSans-Bold',
		fontSize: 14,
		paddingBottom: 10,
	},
};
