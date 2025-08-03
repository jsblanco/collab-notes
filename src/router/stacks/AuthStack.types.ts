export enum AuthStackRoutes {
	AuthsHome = "AuthsHome",
	Startup = "Startup",
}

export type AuthStackProps = {
	[AuthStackRoutes.AuthsHome]: undefined;
	[AuthStackRoutes.Startup]: undefined;
};
