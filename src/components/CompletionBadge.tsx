import { View, StyleSheet } from 'react-native';
import { Text, colors } from '../ui/libUi';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { IconNames } from '../ui/sources/constants/iconNames';

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
			<Ionicons name={IconNames.alarmOutline} color={colors.white} size={28} />
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
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		marginRight: 10,
	},
});
