import { colors, IconNames, OSButton } from "@app/ui";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";

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
				options: [`Edit ${label}`, `Delete ${label}`, "Cancel"],
				destructiveButtonIndex: 1,
				icons: [
					<Ionicons
						key={1}
						name={IconNames.create}
						color={colors.black}
						size={20}
					/>,
					<Ionicons
						key={2}
						name={IconNames.trashBin}
						color={colors.black}
						size={20}
					/>,
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
			},
		);
	}, [showActionSheetWithOptions, label, onDelete, onEdit]);

	return (
		<OSButton onPress={showListOptions}>
			<Ionicons
				name={IconNames.ellipsisHorizontal}
				color={colors.grey[1]}
				size={28}
				style={{ marginRight: 15 }}
			/>
		</OSButton>
	);
};

export default EditDeleteMenu;
