import { DummyUsers } from "../../../data/DummyData";
import type { User } from "../../models";
import * as constants from "./auth.constants";
import { fetchUserData } from "./auth.queries";

type StateType = {
	isLoggedIn: boolean;
	didTryAutoLogin: boolean;
	token: string;
	user: User;
};

const initialState: StateType = {
	isLoggedIn: false,
	didTryAutoLogin: false,
	token: "",
	user: fetchUserData(DummyUsers[0].id),
};

const authReducer = (
	state: StateType = initialState,
	{ type, payload }: { type: string; payload: any },
) => {
	switch (type) {
		case constants.SIGNUP_SUCCESS:
		case constants.LOGIN_SUCCESS:
		case constants.VALID_TOKEN_FOUND:
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
				userId: payload.userId,
			};
		case constants.TRIED_AUTOLOGIN:
			return {
				...state,
				didTryAutoLogin: true,
			};
		case constants.LOGOUT_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
				token: "",
				userId: "",
			};
		default:
			return { ...state };
	}
};

export default authReducer;
