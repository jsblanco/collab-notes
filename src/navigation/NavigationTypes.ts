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

export type DrawerListEntry = ` ${string} `

export enum DrawerStackRoutes {
	Lists = '[Drawer] - Lists',
	Logout = '[Drawer] - Logout',
}

export type DrawerStackProps = {
	[T: DrawerListEntry]: {listId: string};
	[DrawerStackRoutes.Lists]: {};
	[DrawerStackRoutes.Logout]: {};
};
