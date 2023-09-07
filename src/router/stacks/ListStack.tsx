import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import OpenDrawerButton from '@app/components/OpenDrawerButton';
import ListsHomeScreen from '@app/screens/Lists/ListsHomeScreen';
import ListTaksScreen from '@app/screens/Lists/ListTasksScreen';
import TaskDetailsScreen from '@app/screens/Lists/TaskDetailsScreen';
import TaskFormScreen from '@app/screens/Lists/TaskFormScreen/TaskFormScreen';
import { ListStackProps, ListStackRoutes } from '../NavigationTypes';
import styles from '../styles/stack.styles';

const Stack = createStackNavigator<ListStackProps>();

export function ListStack({ route }: any) {
	return (
		<Stack.Navigator
			initialRouteName={ListStackRoutes.ListsHome}
			screenOptions={{
				...(styles as StackNavigationOptions),
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerTitleStyle: { display: 'none' },
			}}>
			<Stack.Screen
				name={ListStackRoutes.ListsHome}
				component={ListsHomeScreen}
				options={{
					headerLeft: OpenDrawerButton,
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
			/>
		</Stack.Navigator>
	);
}
