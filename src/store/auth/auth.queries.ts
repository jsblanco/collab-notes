import type { User } from "@app/models";
import { DummyUsers } from "data/DummyData";

export const fetchUserData = (userId: string): User => {
	const user = DummyUsers.find((user) => user.id === userId);

	if (!user) throw new Error("Could not find user");

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

export const createUserInDb = (data: unknown) => ({
	idToken: "123",
	localId: "123",
	user: {
		id: "string",
		lists: [],
		email: "string",
		name: "string",
		friends: [],
	} as User,
});

export const loginUserFromDb = (data: unknown) => ({
	idToken: "123",
	localId: "123",
	user: {
		id: "string",
		lists: [],
		email: "string",
		name: "string",
		friends: [],
	} as User,
});
