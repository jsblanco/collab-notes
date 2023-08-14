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

export enum DrawerStackRoutes {
	NewList = 'New Lists',
	List = 'List',
}

export type DrawerStackProps = {
	[DrawerStackRoutes.List]: {listId: string};
	[DrawerStackRoutes.NewList]: {};
};
