import React from 'react';
import {
	CardStyleInterpolators,
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import ListEntriesScreen from '../../screens/Lists/ListEntriesScreen/ListEntriesScreen';
import styles from './styles/stack.styles';
import { ListStackProps, ListStackRoutes } from '../NavigationTypes';

const Stack = createStackNavigator<ListStackProps>();


export function ListStack({route}) {
	return (
		<Stack.Navigator
			initialRouteName={ListStackRoutes.ListEntries}
			screenOptions={{
				...styles as StackNavigationOptions,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			{/* <Stack.Screen name={ListStackRoutes.ListsHome} component={ListsScreen} /> */}
			<Stack.Screen name={ListStackRoutes.ListEntries} initialParams={{listId: route.params.listId}} component={ListEntriesScreen} />
		</Stack.Navigator> 
	); 
}
