export enum ListStackRoutes {
	ListsHome = 'ListsHome',
	ListEntries = 'ListEntries',
}

export type ListStackProps = {
	[ListStackRoutes.ListsHome]: undefined;
	[ListStackRoutes.ListEntries]: {
		listId: string;
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

export type DrawerListEntry = `${DrawerStackRoutes.List}${string}`

export enum DrawerStackRoutes {
	Lists = '[Drawer] - Lists',
	List = '[Drawer] - List ',
	Logout = '[Drawer] - Logout',
}

export type DrawerStackProps = {
	[DrawerStackRoutes.Lists]: {};
	[DrawerStackRoutes.Logout]: {};
	[T: DrawerListEntry]: {listId: string};
};
