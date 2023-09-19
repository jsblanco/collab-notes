import { DummyUsers } from 'data/DummyData';
import { User } from '@app/models';
import { axiosInstance } from '../api/axios';

export const fetchUserData = (userId: string): User => {
	const user = DummyUsers.find((user) => user.id === userId);

	if (!user) throw new Error('Could not find user');

	return {
		...user,
		friends: user.friends.reduce((accum, friendId) => {
			const friend = DummyUsers.find((user) => user.id === friendId);
			if (friend !== undefined) {
				accum.push({ ...friend, friends: [] });
			}

			return accum;
		}, [] as User[]),
	};
};
