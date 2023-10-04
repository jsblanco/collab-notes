import { StyleSheet } from 'react-native';
import { Button, colors, Row } from '@app/ui';

interface Props {
	label: string;
	onDelete: () => void;
	onEdit: () => void;
}

const EditDeleteButtonsRow = ({ label, onDelete, onEdit }: Props) => (
	<Row justifyContent={'space-between'}>
		<Button fullWidth buttonStyle={styles.deleteButton} onPress={onDelete}>
			Delete {label}
		</Button>
		<Button fullWidth buttonStyle={styles.editButton} onPress={onEdit}>
			Edit {label}
		</Button>
	</Row>
);

export default EditDeleteButtonsRow;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		paddingTop: 10,
	},
	contentContainer: {
		paddingBottom: 50,
	},
	titleRow: {
		zIndex: 2,
		marginBottom: 32,
		paddingHorizontal: 20,
	},
	title: {
		marginBottom: 0,
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 50,
	},
	section: {
		marginBottom: 30,
		marginHorizontal: 20,
	},

	description: {
		padding: 20,
		paddingBottom: 25,
		marginBottom: 20,
		backgroundColor: colors.grey[5],
		borderRadius: 10,
		alignContent: 'flex-start',
		zIndex: 2,
	},
	greenText: {
		backgroundColor: colors.completed,
	},
	yellowText: {
		backgroundColor: colors.pending,
	},
	completionToggleSection: {
		alignItems: 'center',
	},
	editButton: {
		backgroundColor: colors.general.blue,
	},
	deleteButton: {
		backgroundColor: colors.general.red,
	},
	historyTitle: {
		paddingHorizontal: 20,
	},
	daily: {
		color: colors.general.darkBlue,
	},
	weekly: {
		color: colors.accent,
	},
	monthly: {
		color: colors.general.green,
	},
});
