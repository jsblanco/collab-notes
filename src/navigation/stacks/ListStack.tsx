import React from 'react';
import {
	CardStyleInterpolators,
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { ListStackProps, ListStackRoutes } from '../NavigationTypes';
import ListTaksScreen from '../../screens/Lists/ListTasksScreen';
import TaskFormScreen from '../../screens/Lists/TaskFormScreen/TaskFormScreen';
import styles from '../styles/stack.styles';
import OpenDrawerButton from '../../components/OpenDrawerButton';
import TaskDetailsScreen from '../../screens/Lists/TaskDetailsScreen';
import ListsHomeScreen from '../../screens/Lists/ListsHomeScreen';

const Stack = createStackNavigator<ListStackProps>();

export function ListStack({ route }: any) {
	return (
		<Stack.Navigator
			initialRouteName={ListStackRoutes.ListsHome}
			screenOptions={{
				...(styles as StackNavigationOptions),
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name={ListStackRoutes.ListsHome}
				component={ListsHomeScreen}
				options={{
					headerLeft: OpenDrawerButton,
					title: '',
				}}
			/>
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
			/>
			<Stack.Screen
				name={ListStackRoutes.TaskDetails}
				initialParams={{ listId: route.listId, taskId: route.taskId }}
				component={TaskDetailsScreen}
				options={{
					title: '',
				}}
			/>
		</Stack.Navigator>
	);
}
