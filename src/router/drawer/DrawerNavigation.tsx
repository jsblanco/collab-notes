import OpenDrawerButton from "@app/components/OpenDrawerButton";
import {
	type DrawerProps,
	DrawerRoutes,
	getDrawerListLink,
} from "@app/router/drawer/DrawerNavigation.types";
import { ListStackRoutes } from "@app/router/stacks/ListStack.types";
import ListFormScreen from "@app/screens/Lists/ListFormScreen/ListFormScreen";
import type { RootState } from "@app/store/store";
import { colors, IconNames } from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import {
	createDrawerNavigator,
	type DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { ListStack } from "../stacks/ListStack";
import styles from "../styles/stack.styles";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator<DrawerProps>();

const drawerIcon =
	(icon: IconNames) =>
	({ color, size }: { color: string; size: number }) => (
		<Ionicons
			name={icon}
			color={color}
			size={size}
			style={{ paddingLeft: 15 }}
		/>
	);

export function DrawerNavigation() {
	const { lists } = useSelector((state: RootState) => state.lists);

	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			initialRouteName={DrawerRoutes.ListHome}
			screenOptions={{
				...(styles as DrawerNavigationOptions),
				drawerActiveBackgroundColor: colors.primary,
				drawerActiveTintColor: "#fff",
				drawerInactiveTintColor: "#333",
				headerLeft: OpenDrawerButton,
			}}
		>
			<Drawer.Screen
				name={DrawerRoutes.ListHome}
				component={ListStack}
				initialParams={{
					screen: ListStackRoutes.ListsHome,
				}}
				options={{
					headerShown: false,
					drawerLabel: "Overview",
					drawerIcon: drawerIcon(IconNames.clipboard),
				}}
			/>
			<Drawer.Group>
				{lists?.map((list) => (
					<Drawer.Screen
						key={list.id}
						component={ListStack}
						name={getDrawerListLink(list.id)}
						initialParams={{
							screen: ListStackRoutes.ListTasks,
							params: { listId: list.id },
						}}
						options={{
							headerShown: false,
							title: list.title,
							drawerIcon: drawerIcon(list.icon),
						}}
					/>
				))}
			</Drawer.Group>
			<Drawer.Screen
				name={DrawerRoutes.NewList}
				component={ListFormScreen}
				options={{
					drawerLabel: "New List",
					drawerIcon: drawerIcon(IconNames.documentText),
				}}
			/>
		</Drawer.Navigator>
	);
}
