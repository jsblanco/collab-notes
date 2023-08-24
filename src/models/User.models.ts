import { ImageSourcePropType } from 'react-native';

export interface User {
	id: string;
	lists: string[];
    email: string;
	image: ImageSourcePropType;
	name: string;
    friends: string[];
}
