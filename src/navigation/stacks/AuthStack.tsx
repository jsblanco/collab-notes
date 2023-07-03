import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../../screens/Auth/AuthScreen/AuthScreen";
import StartupScreen from "../../screens/Auth/StartupScreen/StartupScreen";
import styles from './styles/stack.styles'
import { AuthStackProps, AuthStackRoutes } from '../NavigationTypes';

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
            <Stack.Screen
                name={AuthStackRoutes.Startup}
                component={StartupScreen}
            />
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
    )
}
