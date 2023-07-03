import React from 'react';
import { View } from 'react-native';
import styles from './AuthScreen.styles';
import { Text } from '../../../ui/libUi';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackProps, AuthStackRoutes } from '../../../navigation/NavigationTypes';

type Props = StackScreenProps<AuthStackProps, AuthStackRoutes.AuthsHome>;

const AuthScreen = (props: Props) => {
	return (
		<View style={styles.screen}>
			<Text>AuthScreen works!</Text>
		</View>
	);
};

export default AuthScreen;
