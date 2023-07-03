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

export enum DrawerStackRoutes {
	Lists = '[Drawer] - Lists',
}

export type DrawerStackProps = {
	[DrawerStackRoutes.Lists]: {};
};
