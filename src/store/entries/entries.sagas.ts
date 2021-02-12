import {takeLatest, put, call} from "redux-saga/effects";
import * as constants from "./entries.constants";
import * as actions from "./entries.actions";
import * as queries from "./entries.queries";

function* fetchListEntriesEffect({payload}: { type: string, payload: string }) {
    try {
        const entries = yield call(queries.fetchEntries, payload)
        yield put(actions.fetchListEntries.success(entries));
    } catch (e) {
        console.error(e);
        yield put(actions.fetchListEntries.failure(e));
    }
}

function* entriesSagas() {
    yield takeLatest(constants.CONSTANT_NAME_REQUEST, fetchListEntriesEffect);
}

export default entriesSagas;

