import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../ui/libUi';
import {
	AuthStackProps,
	AuthStackRoutes,
} from '../../navigation/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<AuthStackProps, AuthStackRoutes.Startup>;

const StartupScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>StartupScreen works!</Text>
		</View>
	);
};

export default StartupScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
