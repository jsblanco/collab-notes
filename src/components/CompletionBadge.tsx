import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, IconNames } from '@app/ui';

const CompletionBadge = ({ isCompleted }: { isCompleted: boolean }) =>
	isCompleted ? (
		<View style={[styles.green, styles.completionBadge]}>
			<Ionicons
				name={IconNames.checkmarkCircleOutline}
				color={colors.white}
				size={22}
			/>
		</View>
	) : (
		<View style={[styles.yellow, styles.completionBadge]}>
			<Ionicons name={IconNames.timeOutline} color={colors.white} size={22} />
		</View>
	);

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
		marginRight: 10,
	},
});
