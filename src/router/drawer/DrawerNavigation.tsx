import React from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
	createDrawerNavigator,
	DrawerNavigationOptions,
} from '@react-navigation/drawer';
import OpenDrawerButton from '@app/components/OpenDrawerButton';
import ListFormScreen from '@app/screens/Lists/ListFormScreen/ListFormScreen';
import { RootState } from '@app/store/store';
import { colors, IconNames } from '@app/ui';
import {
	DrawerProps,
	DrawerRoutes,
	getDrawerListLink,
	ListStackRoutes,
} from '../NavigationTypes';
import { ListStack } from '../stacks/ListStack';
import styles from '../styles/stack.styles';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator<DrawerProps>();

export function DrawerNavigation() {
	const { lists } = useSelector((state: RootState) => state.lists);

	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			initialRouteName={DrawerRoutes.Home}
			screenOptions={{
				...(styles as DrawerNavigationOptions),
				drawerActiveBackgroundColor: colors.primary,
				drawerActiveTintColor: '#fff',
				drawerInactiveTintColor: '#333',
				headerLeft: OpenDrawerButton,
			}}>
			<Drawer.Screen
				name={DrawerRoutes.Home}
				component={ListStack}
				initialParams={{ screen: ListStackRoutes.ListsHome }}
				options={{
					headerShown: false,
					drawerLabel: 'Overview',
					drawerIcon: ({ color, size }) => (
						<Ionicons name={IconNames.clipboard} color={color} size={size} />
					),
				}}
			/>
			<Drawer.Group>
			{lists?.map((list) => (
				<Drawer.Screen
					key={list.id}
					component={ListStack}
					name={getDrawerListLink(list.id)}
					initialParams={{
						screen: ListStackRoutes.ListTasks,
						params: { listId: list.id },
					}}
					options={{
						headerShown: false,
						title: list.title,
						drawerIcon: ({ color, size }) => (
							<Ionicons
								name={list.icon}
								color={color}
								size={size}
								style={{ paddingLeft: 15 }}
							/>
						),
					}}
				/>
			))}
			</Drawer.Group>
			<Drawer.Screen
				name={DrawerRoutes.NewList}
				component={ListFormScreen}
				initialParams={{
					listId: '',
				}}
				options={{
					drawerLabel: 'New List',
					drawerIcon: ({ color, size }) => (
						<Ionicons name={IconNames.documentText} color={color} size={size} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}
