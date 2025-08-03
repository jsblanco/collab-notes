import CompletionBadge from "@app/components/CompletionBadge";
import TasksFlatList from "@app/components/TasksFlatList";
import type { List } from "@app/models";
import {
	type DrawerProps,
	type DrawerRoutes,
	getDrawerListLink,
} from "@app/router/drawer/DrawerNavigation.types";
import {
	type ListStackProps,
	ListStackRoutes,
} from "@app/router/stacks/ListStack.types";
import type { RootState } from "@app/store";
import { Container, colors, H3, Row } from "@app/ui";
import { Ionicons } from "@expo/vector-icons";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import {
	FlatList,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useSelector } from "react-redux";

type Props = CompositeScreenProps<
	StackScreenProps<ListStackProps, ListStackRoutes.ListsHome>,
	StackScreenProps<DrawerProps, DrawerRoutes.ListHome>
>;

const ListsHomeScreen = ({ navigation }: Props) => {
	const { lists } = useSelector((state: RootState) => state.lists);

	useEffect(() => {
		navigation.setOptions({
			title: `You have ${lists.reduce((acc, list) => list.pendingTasks.length + acc, 0)} pending tasks`,
		});
	}, [navigation, lists]);

	const renderLists = ({ item }: { item: List }) => (
		<View style={styles.listView}>
			<Row
				style={styles.titles}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<TouchableOpacity
					style={{ flexDirection: "row", alignItems: "center" }}
					onPress={() => {
						//@ts-ignore
						navigation.navigate(getDrawerListLink(item.id), {
							screen: ListStackRoutes.ListTasks,
							params: {
								listId: item.id,
							},
						});
					}}
				>
					<Ionicons name={item.icon} color={"#000"} size={24} />
					<H3 noPadding style={{ marginLeft: 10 }}>
						{item.title}
					</H3>
				</TouchableOpacity>
				<CompletionBadge completed={false} />
			</Row>
			<TasksFlatList listId={item.id} tasks={item.pendingTasks} reorderTasks />
		</View>
	);

	return (
		<Container style={styles.screen}>
			<StatusBar backgroundColor={colors.primary} barStyle="light-content" />
			<FlatList
				data={lists}
				renderItem={renderLists}
				contentContainerStyle={{ width: "100%" }}
				keyExtractor={(item) => item.id}
			/>
		</Container>
	);
};

export default ListsHomeScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: "100%",
		paddingTop: 20,
	},
	titles: {
		maxWidth: "100%",
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
	header: {
		paddingBottom: 40,
		width: "100%",
		alignItems: "center",
	},
	listView: {
		width: "100%",
		marginBottom: 50,
	},
});
