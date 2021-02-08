import {takeLatest, put} from "redux-saga/effects";
import * as constants from "./lists.constants";
import * as actions from "./lists.actions";

function* listsEffect({payload}: { type: string, payload: any }) {
    try {
        yield put(actions.actionName.success({payload}
    :
        {
            type: string, payload
        :
            any
        }
    ))
        ;
    } catch (e) {
        console.error(e);
        yield put(actions.actionName.failure(e));
    }
}

function* listsSagas() {
    yield takeLatest(constants.CONSTANT_NAME_REQUEST, listsEffect);
}

export default listsSagas;

