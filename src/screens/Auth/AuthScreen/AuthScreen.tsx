import React from 'react';
import { View } from 'react-native';
import styles from './AuthScreen.styles';
import { Text } from '../../../ui/libUi';

const AuthScreen = (props: any) => {
	return (
		<View style={styles.screen}>
			<Text>AuthScreen works!</Text>
		</View>
	);
};

export default AuthScreen;
