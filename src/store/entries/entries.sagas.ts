import {takeLatest, put} from "redux-saga/effects";
import * as constants from "./entries.constants";
import * as actions from "./entries.actions";

function* entriesEffect({payload}: { type: string, payload: any }) {
    try {
        yield put(actions.actionName.success(payload));
    } catch (e) {
        console.error(e);
        yield put(actions.actionName.failure(e));
    }
}

function* entriesSagas() {
    yield takeLatest(constants.CONSTANT_NAME_REQUEST, entriesEffect);
}

export default entriesSagas;

