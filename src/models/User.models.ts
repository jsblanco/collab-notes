import { ImageSourcePropType } from 'react-native';

export interface User {
	id: string;
	lists: string[];
    email: string;
	name: string;
    friends: string[];
	image?: ImageSourcePropType;
}
