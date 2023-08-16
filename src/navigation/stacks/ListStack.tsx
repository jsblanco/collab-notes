import React from 'react';
import {
	CardStyleInterpolators,
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { ListStackProps, ListStackRoutes } from '../NavigationTypes';
import ListTaksScreen from '../../screens/Lists/ListTasksScreen';
import TaskFormScreen from '../../screens/Lists/TaskFormScreen/TaskFormScreen';
import styles from './styles/stack.styles';
import OpenDrawerButton from '../../components/OpenDrawerButton';

const Stack = createStackNavigator<ListStackProps>();

export function ListStack({ route }: any) {



	
	return (
		<Stack.Navigator
			initialRouteName={ListStackRoutes.ListTasks}
			screenOptions={{
				...(styles as StackNavigationOptions),
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				// headerShown: false,
			}}
		>
			<Stack.Screen
				name={ListStackRoutes.ListTasks}
				initialParams={{ listId: route.params.listId }}
				component={ListTaksScreen}
				options={{
					headerLeft: OpenDrawerButton,
				}}
			/>
			<Stack.Screen
				name={ListStackRoutes.TaskForm}
				initialParams={{ listId: route.params.listId }}
				component={TaskFormScreen}
				// options={{
				// 	headerLeft: () => (
				// 		<Button
				// 			//@ts-ignore
				// 			onPress={() =>
				// 				navigation.navigate(DrawerStackRoutes.List, {
				// 					screen: ListStackRoutes.ListEntries,
				// 				})
				// 			}
				// 			title='Return'
				// 		/>
				// 	),
				// }}
			/>
		</Stack.Navigator>
	);
}
