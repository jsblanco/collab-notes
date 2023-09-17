import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, IconNames, shadow, Tooltip } from '@app/ui';

const CompletionBadge = ({
	completed = false,
	muted,
	tooltip,
	alignLeft,
}: {
	completed?: boolean;
	tooltip?: boolean;
	muted?: boolean;
	alignLeft?: boolean;
}) => {
	const badge = (
		<View
			style={[
				completed ? styles.green : styles.yellow,
				styles.completionBadge,
				muted && { backgroundColor: colors.grey[3] },
			]}>
			<Ionicons
				name={completed ? IconNames.checkmarkCircle : IconNames.time}
				color={colors.white}
				size={22}
			/>
		</View>
	);

	return tooltip ? (
		<Tooltip
			borderRadius={10}
			message={'This task is ' + (completed ? 'completed' : 'pending completion')}
			alignLeft={alignLeft}>
			{badge}
		</Tooltip>
	) : (
		badge
	);
};

export default CompletionBadge;

const styles = StyleSheet.create({
	green: {
		backgroundColor: colors.completed,
	},
	yellow: {
		backgroundColor: colors.pending,
	},
	completionBadge: {
		paddingRight: 7,
		paddingLeft: 8,
		paddingVertical: 5,
		borderRadius: 10,
		...shadow,
	},
});
