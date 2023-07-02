import { enableScreens } from 'react-native-screens';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { RootNavigation } from './src/navigation/RootNavigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { store } from './src/store/store';
import * as Font from 'expo-font';

enableScreens();
const fetchFonts = () =>
	Font.loadAsync({
		openSans: require('./src/assets/fonts/OpenSans-Regular.ttf'),
		'openSans-Bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
	});

const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	if (!fontsLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontsLoaded(true)}
				onError={(e: object) => console.error(e)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<RootNavigation />
		</Provider>
	);
};

const ConnectedApp = connectActionSheet(App);

export default function AppContainer() {
	return (
		<ActionSheetProvider>
			<ConnectedApp />
		</ActionSheetProvider>
	);
}
