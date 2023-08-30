import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import AuthScreen from '@app/screens/Auth/AuthScreen';
import StartupScreen from '@app/screens/Auth/StartupScreen';
import { AuthStackProps, AuthStackRoutes } from '../NavigationTypes';
import styles from '../styles/stack.styles';

const Stack = createStackNavigator<AuthStackProps>();

export function AuthStack() {
	return (
		<Stack.Navigator
			initialRouteName={AuthStackRoutes.Startup}
			// @ts-ignore
			screenOptions={{
				...styles,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			<Stack.Screen name={AuthStackRoutes.Startup} component={StartupScreen} />
			<Stack.Screen
				name={AuthStackRoutes.AuthsHome}
				component={AuthScreen}
				options={{
					headerTitle: 'Welcome!',
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
