import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackProps, AuthStackRoutes } from '@app/router/NavigationTypes';
import { Text } from '@app/ui';

type Props = StackScreenProps<AuthStackProps, AuthStackRoutes.AuthsHome>;

const AuthScreen = (props: Props) => {
	return (
		<View style={styles.screen}>
			<Text>AuthScreen works!</Text>
		</View>
	);
};

export default AuthScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
