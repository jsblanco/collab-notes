import { StyleSheet, View } from 'react-native';
import UserAvatar from '@app/components/UserAvatar';
import { TaskToggleEvent, User } from '@app/models';
import { B, colors, fonts, Row, Text } from '@app/ui';

const TaskHistoryEntry = ({
	toggleEvent,
	user,
	index,
}: {
	toggleEvent: TaskToggleEvent;
	user?: User;
	index: number;
}) => {
	const userName = user?.name.split(' ')[0] ?? 'Automatically';

	return (
		<Row style={styles.entry}>
			{user ? <UserAvatar user={user} i={index} /> : <></>}
			<View style={styles.textView}>
				<Text noPadding>
					<B noPadding>{userName}</B> marked this task as{' '}
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
		marginHorizontal: 20,
	},
	textView: {
		paddingLeft: 10,
		paddingTop: 4,
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
