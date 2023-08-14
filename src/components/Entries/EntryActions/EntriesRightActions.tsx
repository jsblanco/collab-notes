import { View, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
	onDelete: () => void;
}

const EntriesRightActions = ({ onDelete }: Props) => (
	<>
		<View
			style={{
				backgroundColor: 'red',
				paddingHorizontal: 15,
				justifyContent: 'center',
			}}
		>
			<Pressable onPress={onDelete}>
				<Animated.Text
					style={{
						color: 'white',
						paddingHorizontal: 10,
						fontWeight: '600',
					}}
				>
					Eliminar
				</Animated.Text>
			</Pressable>
		</View>
		<View
			style={{
				backgroundColor: 'blue',
				paddingHorizontal: 15,
				justifyContent: 'center',
			}}
		>
			<Animated.Text
				style={{
					color: 'white',
					paddingHorizontal: 10,
					fontWeight: '600',
				}}
			>
				Editar
			</Animated.Text>
		</View>
	</>
);

export default EntriesRightActions;
