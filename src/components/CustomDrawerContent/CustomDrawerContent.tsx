import React from 'react';
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/auth.actions';

const CustomDrawerContent = (props: any) => {
	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(logout.request());
	};

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem
				{...props}
				label='Logout'
				icon={({ color, size }) => (
					<Ionicons name='log-out-outline' color={color} size={size} />
				)}
				onPress={logOut}
			/>
			<DrawerItem
				{...props}
				label='App creator'
				icon={({ color, size }) => (
					<Ionicons
						name='information-circle-outline'
						color={color}
						size={size}
					/>
				)}
				onPress={() => Linking.openURL('https://github.com/jsblanco')}
			/>
		</DrawerContentScrollView>
	);
};

export default CustomDrawerContent;
