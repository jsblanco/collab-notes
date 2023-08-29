import { Ionicons } from '@expo/vector-icons';
import {
	createDrawerNavigator,
	DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import { useSelector } from 'react-redux';
import OpenDrawerButton from '../../components/OpenDrawerButton';
import { RootState } from '../../store/store';
import { colors } from '../../ui';
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
	const { lists, error } = useSelector((state: RootState) => state.lists);
	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			initialRouteName={DrawerRoutes.NewList}
			screenOptions={{
				...(styles as DrawerNavigationOptions),
				drawerActiveBackgroundColor: colors.primary,
				drawerActiveTintColor: '#fff',
				drawerInactiveTintColor: '#333',
				headerLeft: OpenDrawerButton,
				headerShown: false,
			}}>
			<Drawer.Screen
				name={DrawerRoutes.Home}
				component={ListStack}
				initialParams={{ screen: ListStackRoutes.ListsHome }}
				options={{
					drawerLabel: 'Home',
					drawerIcon: ({ color, size }) => (
						<Ionicons name="document-text-outline" color={color} size={size} />
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
							drawerItemStyle: { paddingLeft: 15, paddingRight: -5 },
							drawerIcon: ({ color, size }) => (
								<Ionicons name={list.icon} color={color} size={size} />
							),
						}}
					/>
				))}
			</Drawer.Group>
		</Drawer.Navigator>
	);
}
