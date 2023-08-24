import { StyleSheet, View } from 'react-native';
import UserAvatar from './UserAvatar';
import { Row, Text, colors, fonts } from '../ui/libUi';
import { User } from '../models/User.models';
import { Task, TaskToggleEvent } from '../models/Task.models';

const TaskHistoryEntry = ({
	toggleEvent,
	user,
	index,
}: {
	toggleEvent: TaskToggleEvent;
	user: User;
	index: number;
}) => {
	return (
		<Row style={styles.entry}>
			<UserAvatar user={user} i={index} />
			<View>
				<Text noPadding style={styles.text}>
					{user.name} marked this task as{' '}
					{toggleEvent.completed ? (
						<Text noPadding style={styles.completed}>
							completed
						</Text>
					) : (
						<Text noPadding style={styles.pending}>
							pending
						</Text>
					)}
				</Text>
				<Text noPadding style={styles.timestamp}>
					{new Date(toggleEvent.timestamp).toLocaleDateString('en-GB', {
						weekday: 'long',
						month: 'long',
						year: 'numeric',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}
				</Text>
			</View>
		</Row>
	);
};

export default TaskHistoryEntry;

const styles = StyleSheet.create({
	entry: {
		paddingVertical: 10,
		paddingRight: 30,
	},
	text: {
		paddingTop: 3,
	},
	timestamp: {
		fontSize: 10,
		color: colors.grey[3],
	},
    completed: {
		color: colors.general.green,
        fontFamily: fonts.regularBold,
	},
    pending: {
		color: colors.general.mustard,
        fontFamily: fonts.regularBold,
	},
});