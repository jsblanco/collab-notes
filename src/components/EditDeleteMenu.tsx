import { useCallback } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { colors, IconNames, OSButton, Row } from '@app/ui';

interface Props {
	label: string;
	onDelete: () => void;
	onEdit: () => void;
}

const EditDeleteMenu = ({ label, onDelete, onEdit }: Props) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const showListOptions = useCallback(() => {
		showActionSheetWithOptions(
			{
				options: ['Edit task', 'Delete task', 'Cancel'],
				destructiveButtonIndex: 1,
				icons: [
					<Ionicons name={IconNames.create} color={colors.black} size={20} />,
					<Ionicons name={IconNames.trashBin} color={colors.black} size={20} />,
				],
				cancelButtonIndex: 2,
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						onEdit();
						return;
					case 1:
						onDelete();
						return;
				}
			}
		);
	}, [showActionSheetWithOptions]);

	return (
		<OSButton onPress={showListOptions}>
			<Ionicons
				name={IconNames.ellipsisHorizontal}
				color={colors.white}
				size={28}
				style={{ marginRight: 15 }}
			/>
		</OSButton>
	);
};

export default EditDeleteMenu;
