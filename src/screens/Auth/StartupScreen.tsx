import { Text } from "@app/ui";
import { StyleSheet, View } from "react-native";

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
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
