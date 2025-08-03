import type { ImageSourcePropType } from "react-native";

export interface User {
	id: string;
	lists: string[];
	email: string;
	name: string;
	friends: User[];
	image?: ImageSourcePropType;
}

export interface DbUser {
	id: string;
	lists: string[];
	email: string;
	name: string;
	friends: string[];
	image?: ImageSourcePropType;
}
