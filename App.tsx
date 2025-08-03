import {
	ActionSheetProvider,
	connectActionSheet,
} from "@expo/react-native-action-sheet";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useState } from "react";
import { StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { RootNavigation } from "./src/router/RootNavigation";
import { store } from "./src/store/store";
import { colors, fonts } from "./src/ui";

enableScreens();
const fetchFonts = () =>
	Font.loadAsync({
		[fonts.regular]: require("./src/assets/fonts/Poppins-Regular.ttf"),
		[fonts.regularBold]: require("./src/assets/fonts/Poppins-SemiBold.ttf"),
		[fonts.regularBlack]: require("./src/assets/fonts/Poppins-Black.ttf"),
		[fonts.regularThin]: require("./src/assets/fonts/Poppins-Thin.ttf"),
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
			<StatusBar backgroundColor={colors.background} barStyle="dark-content" />
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
