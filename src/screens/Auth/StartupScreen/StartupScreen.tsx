import React from 'react';
import { View } from 'react-native';
import styles from './StartupScreen.styles';
import { Text } from '../../../ui/libUi';
import {
	AuthStackProps,
	AuthStackRoutes,
} from '../../../navigation/NavigationTypes';
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
