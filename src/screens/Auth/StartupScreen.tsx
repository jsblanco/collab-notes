import type {
	AuthStackProps,
	AuthStackRoutes,
} from "@app/router/stacks/AuthStack.types";
import { Text } from "@app/ui";
import type { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

type Props = StackScreenProps<AuthStackProps, AuthStackRoutes.Startup>;

const StartupScreen = (_: Props) => {
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
