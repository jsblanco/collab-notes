import { takeLatest, put, call } from 'redux-saga/effects';
import * as constants from './entries.constants';
import * as actions from './entries.actions';
import * as queries from './entries.queries';
import { Entry } from '../../models/Entry/Entry';

function* fetchListEntriesEffect({
	payload,
}: {
	type: string;
	payload: string;
}) {
	try {
		const entries = yield call(queries.fetchEntries, payload);
		yield put(actions.fetchListEntries.success(entries));
	} catch (e) {
		console.error(e);
		yield put(actions.fetchListEntries.failure(e));
	}
}

function* removeListEntryEffect({
	payload,
}: {
	type: string;
	payload: { listId: string; entryId: string };
}) {
	try {
		const entries = yield call(queries.removeListEntry, payload.listId, payload.entryId);
		yield put(actions.removeListEntry.success(entries));
	} catch (e) {
		console.error(e);
		yield put(actions.removeListEntry.failure(e));
	}
}

function* entriesSagas() {
	yield takeLatest(constants.FETCH_ENTRIES_REQUEST, fetchListEntriesEffect);
	yield takeLatest(constants.REMOVE_ENTRY_REQUEST, removeListEntryEffect);
}

export default entriesSagas;
