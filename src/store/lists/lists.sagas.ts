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

function* listsSagas() {
	yield takeLatest(constants.FETCH_LISTS_REQUEST, fetchListsEffect);
}

export default listsSagas;
