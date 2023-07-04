import {
	takeLatest,
	put,
	call,
	CallEffect,
	PutEffect,
} from 'redux-saga/effects';
import * as constants from './lists.constants';
import * as actions from './lists.actions';
import * as queries from './lists.queries';
import { ReduxAction } from '../store';
import { List } from '../../models/List/List';
import { Entry } from '../../models/Entry/Entry';

function* fetchListsEffect(): Generator<
	CallEffect | PutEffect<ReduxAction<List[]>>,
	void,
	List[]
> {
	try {
		const lists = yield call(queries.fetchLists);
		yield put(actions.fetchLists.success(lists));
	} catch (e) {
		console.error(e);
		yield put(actions.fetchLists.failure(e));
	}
}

function* fetchListEffect({
	payload,
}: ReduxAction<string>): Generator<
	CallEffect | PutEffect<ReduxAction<List>>,
	void,
	List
> {
	try {
		const list = yield call(queries.fetchList, payload);
		yield put(actions.fetchList.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.fetchLists.failure(e));
	}
}

function* addListEntryEffect({
	payload,
}: ReduxAction<{ listId: string; entry: Entry }>): Generator<
	| CallEffect<List>
	| PutEffect<ReduxAction<List>>
	| PutEffect<ReduxAction<Entry[]>>,
	void,
	List
> {
	try {
		const updatedData = yield call(
			queries.addEntryToList,
			payload.listId,
			payload.entry
		);
		yield put(actions.addListEntry.success(updatedData));
	} catch (e) {
		console.error(e);
		yield put(actions.addListEntry.failure(e));
	}
}

function* removeListEntryEffect({
	payload,
}: ReduxAction<{ listId: string; entryId: string }>): Generator<
	CallEffect<List> | PutEffect<ReduxAction<List>>,
	void,
	List
> {
	try {
		const list = yield call(
			queries.removeListEntry,
			payload.listId,
			payload.entryId
		);
		yield put(actions.removeListEntry.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.removeListEntry.failure(e));
	}
}

function* toggleEntryCompletionEffect({
	payload,
}: ReduxAction<{ entryId: string; listId: string }>): Generator<
	CallEffect<List> | PutEffect<any> | PutEffect<ReduxAction<List>>,
	void,
	List
> {
	try {
		const list = yield call(
			queries.toggleEntryCompletion,
			payload.listId,
			payload.entryId
		);
		yield put(actions.toggleEntryCompletion.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.toggleEntryCompletion.failure(e));
	}
}

function* listsSagas() {
	yield takeLatest(constants.FETCH_LISTS_REQUEST, fetchListsEffect);
	yield takeLatest(constants.FETCH_LIST_REQUEST, fetchListEffect);
	yield takeLatest(constants.ADD_ENTRY_REQUEST, addListEntryEffect);
	yield takeLatest(constants.REMOVE_ENTRY_REQUEST, removeListEntryEffect);
	yield takeLatest(
		constants.TOGGLE_ENTRY_COMPLETION_REQUEST,
		toggleEntryCompletionEffect
	);
}

export default listsSagas;
