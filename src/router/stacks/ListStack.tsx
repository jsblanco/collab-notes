import OpenDrawerButton from "@app/components/OpenDrawerButton";
import {
	type ListStackProps,
	ListStackRoutes,
} from "@app/router/stacks/ListStack.types";
import ListFormScreen from "@app/screens/Lists/ListFormScreen/ListFormScreen";
import ListsHomeScreen from "@app/screens/Lists/ListsHomeScreen";
import ListTaksScreen from "@app/screens/Lists/ListTasksScreen";
import TaskDetailsScreen from "@app/screens/Lists/TaskDetailsScreen";
import TaskFormScreen from "@app/screens/Lists/TaskFormScreen/TaskFormScreen";

import {
	CardStyleInterpolators,
	createStackNavigator,
	type StackNavigationOptions,
} from "@react-navigation/stack";
import styles from "../styles/stack.styles";

const Stack = createStackNavigator<ListStackProps>();

export function ListStack() {
	return (
		<Stack.Navigator
			initialRouteName={ListStackRoutes.ListsHome}
			screenOptions={{
				...(styles as StackNavigationOptions),
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen
				name={ListStackRoutes.ListsHome}
				component={ListsHomeScreen}
				options={{
					headerLeft: OpenDrawerButton,
				}}
			/>
			<Stack.Screen
				name={ListStackRoutes.ListTasks}
				component={ListTaksScreen}
				options={{
					headerLeft: OpenDrawerButton,
				}}
			/>
			<Stack.Screen
				name={ListStackRoutes.EditList}
				component={ListFormScreen}
			/>
			<Stack.Screen
				name={ListStackRoutes.TaskForm}
				component={TaskFormScreen}
			/>
			<Stack.Screen
				name={ListStackRoutes.TaskDetails}
				component={TaskDetailsScreen}
			/>
		</Stack.Navigator>
	);
}
