import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../../screens/Auth/AuthScreen/AuthScreen";
import StartupScreen from "../../screens/Auth/StartupScreen/StartupScreen";
import styles from './styles/stack.styles'

const Stack = createStackNavigator();

export function AuthStack() {

    return (
        <Stack.Navigator
            initialRouteName="Startup"
            // @ts-ignore
            screenOptions={{
                ...styles,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="StartUp"
                component={StartupScreen}
            />
            <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{
                    headerTitle: "Welcome to Sense",
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
