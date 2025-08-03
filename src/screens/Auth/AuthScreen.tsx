import type {
	AuthStackProps,
	AuthStackRoutes,
} from "@app/router/stacks/AuthStack.types";
import { Text } from "@app/ui";
import type { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

type Props = StackScreenProps<AuthStackProps, AuthStackRoutes.AuthsHome>;

const AuthScreen = (_: Props) => {
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
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
