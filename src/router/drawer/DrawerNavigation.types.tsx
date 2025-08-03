import type {
	ListStackProps,
	ListStackRoutes,
} from "@app/router/stacks/ListStack.types";
import type { NavigatorScreenParams } from "@react-navigation/native";

export type DrawerListEntry = `[Drawer] List #${string}`;
export const getDrawerListLink = (listId: string): DrawerListEntry =>
	`[Drawer] List #${listId}`;

export enum DrawerRoutes {
	NewList = "[Drawer] New Lists",
	List = "[Drawer] List",
	ListHome = "[Drawer] Lists Home",
}

export type DrawerProps = {
	[DrawerRoutes.ListHome]: {
		screen: ListStackRoutes.ListsHome;
	};
	[DrawerRoutes.NewList]: {
		listId?: string;
	};
	[DrawerRoutes.List]: NavigatorScreenParams<ListStackProps>;
} & {
	[key in DrawerListEntry]: NavigatorScreenParams<ListStackProps>;
};
