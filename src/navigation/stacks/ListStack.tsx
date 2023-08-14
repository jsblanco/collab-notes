import React, { useCallback } from 'react';
import {
	CardStyleInterpolators,
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { ListStackProps, ListStackRoutes } from '../NavigationTypes';
import ListEntriesScreen from '../../screens/Lists/ListEntriesScreen';
import ListEntryForm from '../../screens/Lists/ListEntryForm/ListEntryForm';
import styles from './styles/stack.styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

const Stack = createStackNavigator<ListStackProps>();

export function ListStack({ route }: any) {
	const navigation = useNavigation();

	return (
		<Stack.Navigator
			initialRouteName={ListStackRoutes.ListEntries}
			screenOptions={{
				...(styles as StackNavigationOptions),
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				// headerShown: false,
			}}
		>
			<Stack.Screen
				name={ListStackRoutes.ListEntries}
				initialParams={{ listId: route.params.listId }}
				component={ListEntriesScreen}
				options={{
					headerLeft: () => (
						<Button
							//@ts-ignore
							onPress={navigation.toggleDrawer}
							title='Info'
						/>
					),
				}}
			/>
			<Stack.Screen
				name={ListStackRoutes.EntryForm}
				initialParams={{ listId: route.params.listId }}
				component={ListEntryForm}
			/>
		</Stack.Navigator>
	);
}
