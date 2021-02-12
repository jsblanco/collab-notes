import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import AuthScreen from "../../screens/Auth/AuthScreen/AuthScreen";
import ListsScreen from "../../screens/Lists/ListsScreen/ListsScreen";
import ListEntriesScreen from "../../screens/Lists/ListEntriesScreen/ListEntriesScreen";
import styles from './styles/stack.styles'

const Stack = createStackNavigator();

export function ListStack() {

    return (
        <Stack.Navigator
            initialRouteName="ListsScreen"
            // @ts-ignore
            screenOptions={{
                ...styles,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="ListsScreen"
                component={ListsScreen}
            />
            <Stack.Screen
                name="ListEntriesScreen"
                component={ListEntriesScreen}
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
