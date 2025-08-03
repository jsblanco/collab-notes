import {
	type AuthStackProps,
	AuthStackRoutes,
} from "@app/router/stacks/AuthStack.types";
import AuthScreen from "@app/screens/Auth/AuthScreen";
import StartupScreen from "@app/screens/Auth/StartupScreen";
import {
	CardStyleInterpolators,
	createStackNavigator,
} from "@react-navigation/stack";
import styles from "../styles/stack.styles";

const Stack = createStackNavigator<AuthStackProps>();

export function AuthStack() {
	return (
		<Stack.Navigator
			initialRouteName={AuthStackRoutes.Startup}
			// @ts-ignore
			screenOptions={{
				...styles,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen name={AuthStackRoutes.Startup} component={StartupScreen} />
			<Stack.Screen
				name={AuthStackRoutes.AuthsHome}
				component={AuthScreen}
				options={{
					headerTitle: "Welcome!",
					//     headerLeft: () => (
					//     <HeaderButtons HeaderButtonComponent={HeaderButton}>
					//     <Item title={'Menu'} iconName={'ios-menu'}
					// onPress={() => {} }/>
					// </HeaderButtons>
					// )
				}}
			/>
		</Stack.Navigator>
	);
}
