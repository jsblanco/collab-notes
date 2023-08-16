import React, { useState } from 'react';
import {
	NavigationContainer,
	createNavigationContainerRef,
} from '@react-navigation/native';

import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { AuthStack } from './stacks/AuthStack';
import StartupScreen from '../screens/Auth/StartupScreen';
import { DrawerNavigation } from './drawer/DrawerNavigation';

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
