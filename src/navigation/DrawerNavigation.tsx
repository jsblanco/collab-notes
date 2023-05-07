import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {constants} from "../UI/constants/constants";
import {Ionicons} from "@expo/vector-icons";
import CustomDrawerContent from "../UI/library/basics/CustomDrawerContent/CustomDrawerContent";
import {ListStack} from "./stacks/ListsStack";

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName="Lists"
            screenOptions={{}}
            drawerContent={props => <CustomDrawerContent {...props}/>}
        >
            <Drawer.Screen
                name="Lists"
                component={ListStack}
                options={{
                    drawerLabel: "Lists",
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="document-text-outline" color={color} size={size}/>
                    ),
                }}
            />
        </Drawer.Navigator>

    )
}

const tabBarOptions = {
    activeTintColor: constants.brightAccent,
    style: {
        height: 75,
        paddingTop: 10
    },
    labelStyle: {
        fontFamily: 'openSansBold',
        fontSize: 14,
        paddingBottom: 10
    }
}
