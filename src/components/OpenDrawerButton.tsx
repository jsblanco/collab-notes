import { colors, IconNames } from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

const OpenDrawerButton = () => {
	const navigation = useNavigation();

	return (
		<Pressable
			//@ts-ignore
			onPress={navigation.toggleDrawer}
		>
			<Ionicons
				name={IconNames.hamburgerMenu}
				color={colors.white}
				size={28}
				style={{ marginLeft: 10 }}
			/>
		</Pressable>
	);
};

export default OpenDrawerButton;
