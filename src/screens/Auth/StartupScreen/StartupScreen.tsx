import React from 'react';
import { View } from 'react-native';
import styles from './StartupScreen.styles';
import { Text } from '../../../ui/libUi';

const StartupScreen = (props: any) => {
	return (
		<View style={styles.screen}>
			<Text>StartupScreen works!</Text>
		</View>
	);
};

export default StartupScreen;
