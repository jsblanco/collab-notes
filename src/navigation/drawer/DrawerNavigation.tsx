import React, { ReactNode } from 'react';
import {
	DrawerNavigationOptions,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { ListStack } from '../stacks/ListStack';
import { colors } from '../../ui/libUi';
import CustomDrawerContent from './CustomDrawerContent';
import { DrawerProps, DrawerRoutes } from '../NavigationTypes';
import { AuthStack } from '../stacks/AuthStack';
import OpenDrawerButton from '../../components/OpenDrawerButton';
import styles from '../stacks/styles/stack.styles';

const Drawer = createDrawerNavigator<DrawerProps>();

export function DrawerNavigation() {
	const DrawerContent = ({ children }: { children?: ReactNode }) => (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			initialRouteName={DrawerRoutes.NewList}
			screenOptions={{
				...(styles as DrawerNavigationOptions),
				drawerActiveBackgroundColor: colors.primary,
				drawerActiveTintColor: '#fff',
				drawerInactiveTintColor: '#333',
				headerLeft: OpenDrawerButton,
			}}
		>
			<Drawer.Screen
				name={DrawerRoutes.NewList}
				component={AuthStack}
				options={{
					drawerLabel: 'TODO: Change to Create List',
					drawerIcon: ({ color, size }) => (
						<Ionicons name='document-text-outline' color={color} size={size} />
					),
				}}
			/>
			<Drawer.Screen
				component={ListStack}
				name={DrawerRoutes.List}
				initialParams={{ listId: '0' }}
				getId={({ params }) => params.listId}
				options={{
					headerShown: false,
					drawerItemStyle: { height: 0 },
				}}
			/>
			{children}
		</Drawer.Navigator>
	);

	return <DrawerContent></DrawerContent>;
}
