import {
	takeLatest,
	put,
	call,
	SimpleEffect,
	CallEffectDescriptor,
	PutEffect,
	CallEffect,
} from 'redux-saga/effects';
import * as constants from './entries.constants';
import * as actions from './entries.actions';
import * as queries from './entries.queries';
import { Entry } from '../../models/Entry/Entry';
import { List } from '../../models/List/List';
import { modifyList } from '../lists/lists.actions';

function* fetchListEntriesEffect({
	payload,
}: {
	type: string;
	payload: string;
}): Generator<
	CallEffect<Entry[]> | PutEffect<{ type: string; payload: Entry[] }>,
	void,
	Entry[]
> {
	try {
		const entries = yield call(queries.fetchEntries, payload);
		yield put(actions.fetchListEntries.success(entries));
	} catch (e) {
		console.error(e);
		yield put(actions.fetchListEntries.failure(e));
	}
}

function* addListEntryEffect({
	payload,
}: {
	type: string;
	payload: { listId: string; entry: Entry };
}): Generator<
	| CallEffect<queries.addEntryToListReturn>
	| PutEffect<{ type: string; payload: List }>
	| PutEffect<{ type: string; payload: Entry[] }>,
	void,
	queries.addEntryToListReturn
> {
	try {
		const updatedData = yield call(
			queries.addEntryToList,
			payload.listId,
			payload.entry
		);
		yield put(modifyList.success(updatedData.list));
		yield put(actions.addListEntry.success(updatedData.entries));
	} catch (e) {
		console.error(e);
		yield put(actions.addListEntry.failure(e));
	}
}

function* removeListEntryEffect({
	payload,
}: {
	type: string;
	payload: { listId: string; entryId: string };
}): Generator<
	CallEffect<Entry[]> | PutEffect<{ type: string; payload: Entry[] }>,
	void,
	Entry[]
> {
	try {
		const entries = yield call(
			queries.removeListEntry,
			payload.listId,
			payload.entryId
		);
		yield put(actions.removeListEntry.success(entries));
	} catch (e) {
		console.error(e);
		yield put(actions.removeListEntry.failure(e));
	}
}

function* entriesSagas() {
	yield takeLatest(constants.FETCH_ENTRIES_REQUEST, fetchListEntriesEffect);
	yield takeLatest(constants.ADD_ENTRY_REQUEST, addListEntryEffect);
	yield takeLatest(constants.REMOVE_ENTRY_REQUEST, removeListEntryEffect);
}

export default entriesSagas;
