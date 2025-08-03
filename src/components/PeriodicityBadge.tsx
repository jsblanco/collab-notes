import { Periodicity } from "@app/models";
import { colors, fonts, IconNames, shadow, Tooltip } from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

// TODO - Rework into some more intuitive iconography

const periodicityIcons = {
	[Periodicity.DAILY]: "D",
	[Periodicity.WEEKLY]: "7",
	[Periodicity.MONTHLY]: "30",
};

const periodicityTooltip = {
	[Periodicity.DAILY]: "This task is automatically marked as pending every day",
	[Periodicity.WEEKLY]:
		"This task is automatically marked as pending every week",
	[Periodicity.MONTHLY]:
		"This task is automatically marked as pending every month",
	[Periodicity.MANUAL]: "This task will not be automatically marked as pending",
};

const PeriodicityBadge = ({
	periodicity,
	tooltip,
	alignLeft,
}: {
	periodicity: Periodicity;
	tooltip?: boolean;
	alignLeft?: boolean;
}) => {
	const badge = (
		<View style={[styles.periodicityBadge]}>
			{periodicity === Periodicity.MANUAL ? (
				<Ionicons name={IconNames.create} color={colors.white} size={23} />
			) : (
				<Text style={styles.number}>{periodicityIcons[periodicity]}</Text>
			)}
		</View>
	);

	return tooltip ? (
		<Tooltip
			borderRadius={20}
			message={periodicityTooltip[periodicity]}
			alignLeft={alignLeft}
		>
			{badge}
		</Tooltip>
	) : (
		badge
	);
};

export default PeriodicityBadge;

const styles = StyleSheet.create({
	periodicityBadge: {
		backgroundColor: colors.primary,
		padding: 8,
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
		...shadow,
	},
	number: {
		fontSize: 18,
		fontFamily: fonts.regularBold,
		color: colors.white,
	},
});
