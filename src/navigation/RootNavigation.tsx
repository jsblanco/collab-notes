import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigation } from './drawer/DrawerNavigation';
import StartupScreen from '../screens/Auth/StartupScreen';
import { AuthStack } from './stacks/AuthStack';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export function RootNavigation() {
	const isAuth = true; //useSelector((state: RootState) => !!state.auth.token);
	const didTryAutoLogin = useSelector(
		(state: RootState) => state.auth.didTryAutoLogin
	);

	return (
		<NavigationContainer>
			{isAuth && <DrawerNavigation />}
			{!isAuth && didTryAutoLogin && <AuthStack />}
			{!isAuth && !didTryAutoLogin && <StartupScreen />}
		</NavigationContainer>
	);
}
