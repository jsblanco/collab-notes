import { colors, IconNames } from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import styles from "./avatars.styles";

const AppAvatar = ({
	i = 0,
	big = false,
	overlap = false,
}: {
	i?: number;
	big?: boolean;
	overlap?: boolean;
}) => {
	return (
		<View
			style={{
				...styles.wrapper,
				...(big ? styles.big : styles.small),
				...(overlap && { marginLeft: -10, zIndex: -i }),
			}}
		>
			<View
				style={{
					...styles.userAvatar,
					...styles.appAvatar,
					...(big
						? { ...styles.big, ...styles.bigText }
						: { ...styles.small, ...styles.text }),
					...(overlap && { marginLeft: -10, zIndex: -i }),
				}}
			>
				<Ionicons name={IconNames.cog} color={colors.white} size={28} />
			</View>
		</View>
	);
};

export default AppAvatar;
