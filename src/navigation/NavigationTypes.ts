import { Entry } from '../models/Entry/Entry';

export enum ListStackRoutes {
	ListHome = 'ListsHome',
	ListEntries = 'ListEntries',
	EntryForm = 'EntryForm',
}

export type ListStackProps = {
	[ListStackRoutes.ListHome]: undefined;
	[ListStackRoutes.ListEntries]: {
		listId: string;
	};
	[ListStackRoutes.EntryForm]: {
		listId: string;
		entry?: Entry;
	};
};

export enum AuthStackRoutes {
	AuthsHome = 'AuthsHome',
	Startup = 'Startup',
}

export type AuthStackProps = {
	[AuthStackRoutes.AuthsHome]: undefined;
	[AuthStackRoutes.Startup]: {};
};

export type DrawerListEntry = `[List] ${string}`;

export const getDrawerListLink = (listId: string): DrawerListEntry =>
	`[List] ${listId}`;

export enum DrawerStackRoutes {
	Lists = '[Drawer] - Lists',
	Logout = '[Drawer] - Logout',
}

export type DrawerStackProps = {
	[T: DrawerListEntry]: { listId: string };
	[DrawerStackRoutes.Lists]: {};
	[DrawerStackRoutes.Logout]: {};
};
