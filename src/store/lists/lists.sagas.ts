import {
	takeLatest,
	put,
	call,
	CallEffect,
	PutEffect,
} from 'redux-saga/effects';
import * as c from './lists.constants';
import * as actions from './lists.actions';
import * as queries from './lists.queries';
import { ReduxAction } from '../store';
import { List } from '../../models/List/List';
import { Task } from '../../models/Task/Task';

function* fetchListsEffect(): Generator<
	CallEffect | PutEffect<ReduxAction<List[]>>,
	void,
	List[]
> {
	try {
		const lists = yield call(queries.fetchLists);
		yield put(actions.fetchAllLists.success(lists));
	} catch (e) {
		console.error(e);
		yield put(actions.fetchAllLists.failure(e));
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
		yield put(actions.fetchSingleList.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.fetchAllLists.failure(e));
	}
}

function* addListTaskEffect({
	payload,
}: ReduxAction<{ listId: string; task: Task }>): Generator<
	| CallEffect<List>
	| PutEffect<ReduxAction<List>>
	| PutEffect<ReduxAction<Task[]>>,
	void,
	List
> {
	try {
		const updatedData = yield call(
			queries.addTaskToList,
			payload.listId,
			payload.task
		);
		yield put(actions.addListTask.success(updatedData));
	} catch (e) {
		console.error(e);
		yield put(actions.addListTask.failure(e));
	}
}

function* removeListTaskEffect({
	payload,
}: ReduxAction<{ listId: string; taskId: string }>): Generator<
	CallEffect<List> | PutEffect<ReduxAction<List>>,
	void,
	List
> {
	try {
		const list = yield call(
			queries.removeListTask,
			payload.listId,
			payload.taskId
		);
		yield put(actions.removeListTask.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.removeListTask.failure(e));
	}
}

function* toggleTaskCompletionEffect({
	payload,
}: ReduxAction<{ taskId: string; listId: string }>): Generator<
	CallEffect<List> | PutEffect<any> | PutEffect<ReduxAction<List>>,
	void,
	List
> {
	try {
		const list = yield call(
			queries.toggleTaskCompletion,
			payload.listId,
			payload.taskId
		);
		yield put(actions.toggleTaskCompletion.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.toggleTaskCompletion.failure(e));
	}
}

function* changeTaskListIndexEffect({
	payload,
}: ReduxAction<{ taskOrder: string[]; listId: string }>): Generator<
	CallEffect<List> | PutEffect<any> | PutEffect<ReduxAction<List>>,
	void,
	List
> {
	try {
		const list = yield call(
			queries.changeTaskOrder,
			payload.listId,
			payload.taskOrder
		);
		yield put(actions.changeTaskListIndex.success(list));
	} catch (e) {
		console.error(e);
		yield put(actions.changeTaskListIndex.failure(e));
	}
}

function* listsSagas() {
	yield takeLatest(c.FETCH_ALL_LISTS_REQUEST, fetchListsEffect);
	yield takeLatest(c.FETCH_SINGLE_LIST_REQUEST, fetchListEffect);
	yield takeLatest(c.ADD_TASK_REQUEST, addListTaskEffect);
	yield takeLatest(c.REMOVE_TASK_REQUEST, removeListTaskEffect);
	yield takeLatest(c.TOGGLE_TASK_COMPL_REQUEST, toggleTaskCompletionEffect);
	yield takeLatest(c.CHANGE_TASK_ORDER_REQUEST, changeTaskListIndexEffect);
}

export default listsSagas;
