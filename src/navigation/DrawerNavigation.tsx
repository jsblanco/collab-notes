import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { ListStack } from './stacks/ListsStack';
import { colors } from '../ui/libUi';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import { DrawerStackProps, DrawerStackRoutes } from './NavigationTypes';

const Drawer = createDrawerNavigator<DrawerStackProps>();

export function DrawerNavigation() {
	return (
		<Drawer.Navigator
			initialRouteName={DrawerStackRoutes.Lists}
			screenOptions={{}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen
				name={DrawerStackRoutes.Lists}
				component={ListStack}
				options={{
					drawerLabel: 'Lists',
					drawerIcon: ({ color, size }) => (
						<Ionicons name='document-text-outline' color={color} size={size} />
					),
				}}
			/>
		</Drawer.Navigator>
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
