import {takeLatest, put, call} from "redux-saga/effects";
import * as constants from "./lists.constants";
import * as actions from "./lists.actions";
import * as queries from "./lists.queries";

function* listsEffect({payload}: { type: string, payload: any }) {
    try {
        const lists = yield call(queries.fetchLists)
        yield put(actions.fetchLists.success(lists))
    } catch (e) {
        console.error(e);
        yield put(actions.fetchLists.failure(e));
    }
}

function* listsSagas() {
    yield takeLatest(constants.CONSTANT_NAME_REQUEST, listsEffect);
}

export default listsSagas;

