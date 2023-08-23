import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	ImageBackground,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchAllLists } from '../../store/lists/lists.actions';
import { fonts } from '../../ui/libUi';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const dispatch = useDispatch();
	const { lists, error } = useSelector((state: RootState) => state.lists);
	const [isLoading, setIsLoading] = useState(false);

	const loadLists = useCallback(
		async () => await dispatch(fetchAllLists.request()),
		[dispatch]
	);

	useEffect(() => {
		setIsLoading(true);
		loadLists().then(() => setIsLoading(false));
	}, [dispatch, loadLists]);

	const DrawerContent = ({ children }: { children?: React.ReactNode }) => (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{
					backgroundColor: '#8200d6',
				}}
			>
				<UserHeader />

				<View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
					<DrawerItemList {...props} />
					{children}
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name='share-social-outline' size={22} />
						<Text
							style={{
								fontSize: 15,
								fontFamily: fonts.regular,
								marginLeft: 5,
							}}
						>
							Tell a Friend
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name='exit-outline' size={22} />
						<Text
							style={{
								fontSize: 15,
								fontFamily: fonts.regular,
								marginLeft: 5,
							}}
						>
							Sign Out
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);

	if (!!error || isLoading || (!isLoading && lists.length === 0))
		return (
			<DrawerContent>
				<Text>Loading lists...</Text>
			</DrawerContent>
		);

	return <DrawerContent />;
};

const UserHeader = () => (
	<ImageBackground
		source={require('../../assets/images/bg.png')}
		style={{ padding: 20, paddingTop: 100, marginTop: -80 }}
	>
		<Image
			source={require('../../assets/images/profile.png')}
			style={{
				height: 80,
				width: 80,
				borderRadius: 40,
				marginBottom: 10,
			}}
		/>
		<Text
			style={{
				color: '#fff',
				fontSize: 18,
				fontFamily: fonts.regular,
				marginBottom: 5,
			}}
		>
			Jorgito
		</Text>
	</ImageBackground>
);

export default CustomDrawerContent;

const styles = StyleSheet.create({
	navButton: {
		alignItems: 'flex-start',
	},
	navButtonIdle: {
		backgroundColor: 'white',
		color: 'black',
	},
});
