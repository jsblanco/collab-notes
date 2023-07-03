import {
	takeLatest,
	put,
	call,
	PutEffect,
	CallEffect,
} from 'redux-saga/effects';
import * as constants from './entries.constants';
import * as actions from './entries.actions';
import * as queries from './entries.queries';
import { Entry } from '../../models/Entry/Entry';
import { List } from '../../models/List/List';
import { modifyList } from '../lists/lists.actions';
import { ReduxAction } from '../store';

function* fetchListEntriesEffect({
	payload,
}: ReduxAction<string>): Generator<
	CallEffect<Entry[]> | PutEffect<ReduxAction<Entry[]>>,
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
}: ReduxAction<{ listId: string; entry: Entry }>): Generator<
	| CallEffect<queries.addEntryToListReturn>
	| PutEffect<ReduxAction<List>>
	| PutEffect<ReduxAction<Entry[]>>,
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
}: ReduxAction<{ listId: string; entryId: string }>): Generator<
	CallEffect<boolean> | PutEffect<ReduxAction<string>>,
	void
> {
	try {
		const entries = yield call(
			queries.removeListEntry,
			payload.listId,
			payload.entryId
		);
		yield put(actions.removeListEntry.success(payload.entryId));
	} catch (e) {
		console.error(e);
		yield put(actions.removeListEntry.failure(e));
	}
}

function* toggleEntryCompletionEffect({
	payload,
}: ReduxAction<string>): Generator<
	CallEffect<Entry> | PutEffect<ReduxAction<Entry>>,
	void,
	Entry
> {
	try {
		const entry = yield call(queries.toggleEntryCompletion, payload);
		yield put(actions.toggleEntryCompletion.success(entry));
	} catch (e) {
		console.error(e);
		yield put(actions.toggleEntryCompletion.failure(e));
	}
}

function* entriesSagas() {
	yield takeLatest(constants.FETCH_ENTRIES_REQUEST, fetchListEntriesEffect);
	yield takeLatest(constants.ADD_ENTRY_REQUEST, addListEntryEffect);
	yield takeLatest(constants.REMOVE_ENTRY_REQUEST, removeListEntryEffect);
	yield takeLatest(
		constants.TOGGLE_ENTRY_COMPLETION_REQUEST,
		toggleEntryCompletionEffect
	);
}

export default entriesSagas;
