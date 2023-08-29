import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
	AuthStackProps,
	AuthStackRoutes,
} from '@app/navigation/NavigationTypes';
import { Text } from '@app/ui';

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
});
