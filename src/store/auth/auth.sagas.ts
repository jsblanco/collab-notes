/** biome-ignore-all lint/suspicious/noExplicitAny: <auth implementation is still pending so biome please stop bugging me> */
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	type CallEffect,
	call,
	type PutEffect,
	put,
	takeLatest,
} from "redux-saga/effects";
import type { ReduxAction } from "../store";
import { login, logout, signup } from "./auth.actions";
import * as constants from "./auth.constants";
import { createUserInDb, loginUserFromDb } from "./auth.queries";

function* signupEffect({
	payload,
}: ReduxAction<{ email: string; password: string }>): Generator<
	CallEffect<any> | PutEffect<ReduxAction<any>>,
	void,
	any
> {
	try {
		const serverResponse = yield call(createUserInDb, payload);
		yield put(
			signup.success({
				token: serverResponse.idToken,
				user: serverResponse.localId,
			}),
		);
		const expirationDate = new Date(
			Date.now() + +serverResponse.expiresIn * 1000,
		);
		saveDataToStorage(
			serverResponse.idToken,
			serverResponse.localId,
			expirationDate,
		);
	} catch (e) {
		console.error(e);
		yield put(signup.failure(e));
	}
}

function* loginEffect({
	payload,
}: ReduxAction<{ email: string; password: string }>): Generator<
	CallEffect<any> | PutEffect<ReduxAction<any>>,
	void,
	any
> {
	try {
		const serverResponse = yield call(loginUserFromDb, payload);
		yield put(
			login.success({
				token: serverResponse.idToken,
				user: serverResponse.localId,
			}),
		);
		const expirationDate = new Date(
			Date.now() + +serverResponse.expiresIn * 1000,
		);
		saveDataToStorage(
			serverResponse.idToken,
			serverResponse.localId,
			expirationDate,
		);
	} catch (e) {
		console.error(e);
		yield put(login.failure(e));
	}
}

function* logoutEffect() {
	try {
		console.log("logout");
		deleteDataFromStorage();
		yield put(logout.success());
	} catch (e) {
		console.error(e);
	}
}

function* authSagas() {
	yield takeLatest(constants.SIGNUP_REQUEST, signupEffect);
	yield takeLatest(constants.LOGIN_REQUEST, loginEffect);
	yield takeLatest(constants.LOGOUT_REQUEST, logoutEffect);
}

export default authSagas;

const saveDataToStorage = async (
	token: string,
	userId: string,
	expirationDate: Date,
) => {
	try {
		await AsyncStorage.setItem(
			"userData",
			JSON.stringify({
				token: token,
				userId: userId,
				expirationDate: expirationDate.toISOString(),
			}),
		);
	} catch (e) {
		console.error(e);
	}
};

const deleteDataFromStorage = async () => {
	try {
		await AsyncStorage.removeItem("userData");
	} catch (e) {
		console.error(e);
	}
};
