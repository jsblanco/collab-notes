import {
	call,
	CallEffect,
	put,
	PutEffect,
	select,
	SelectEffect,
	takeLatest,
} from 'redux-saga/effects';
import { List, Task, TaskDto } from '@app/models';
import { ReduxAction, RootState } from '../store';
import { AddListPayload } from './list.types';
import * as actions from './lists.actions';
import c from './lists.constants';
import * as queries from './lists.queries';

const getUserId = (state: RootState): string => state.auth.user.id;

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
		yield put(actions.fetchAllLists.failure((e as { message: string }).message));
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
		yield put(actions.fetchAllLists.failure((e as { message: string }).message));
	}
}

function* addListEffect({
	payload,
}: ReduxAction<AddListPayload>): Generator<
	| SelectEffect
	| CallEffect<List>
	| PutEffect<ReduxAction<List>>
	| PutEffect<ReduxAction<Task[]>>,
	void,
	string | List
> {
	try {
		const userId = yield select(getUserId);
		const updatedData = yield call(queries.addList, {
			...payload,
			userId: userId as string,
		});
		yield put(actions.addList.success(updatedData as List));
	} catch (e) {
		console.error(e);
		yield put(actions.addList.failure((e as { message: string }).message));
	}
}

function* addListTaskEffect({
	payload,
}: ReduxAction<{ listId: string; task: TaskDto }>): Generator<
	| SelectEffect
	| CallEffect<List>
	| PutEffect<ReduxAction<List>>
	| PutEffect<ReduxAction<Task[]>>,
	void,
	string | List
> {
	try {
		const userId = yield select(getUserId);
		const updatedData = yield call(
			queries.addTaskToList,
			payload.listId,
			payload.task,
			userId as string
		);
		yield put(actions.addListTask.success(updatedData as List));
	} catch (e) {
		console.error(e);
		yield put(actions.addListTask.failure((e as { message: string }).message));
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
		yield put(actions.removeListTask.failure((e as { message: string }).message));
	}
}

function* toggleTaskCompletionEffect({
	payload,
}: ReduxAction<{ taskId: string; listId: string }>): Generator<
	| SelectEffect
	| CallEffect<List>
	| PutEffect<any>
	| PutEffect<ReduxAction<List>>,
	void,
	string | List
> {
	try {
		const userId = yield select(getUserId);
		const list = yield call(
			queries.toggleTaskCompletion,
			payload.listId,
			payload.taskId,
			userId as string
		);
		yield put(actions.toggleTaskCompletion.success(list as List));
	} catch (e) {
		console.error(e);
		yield put(
			actions.toggleTaskCompletion.failure((e as { message: string }).message)
		);
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
	} catch (e: any) {
		console.error(e);
		yield put(
			actions.changeTaskListIndex.failure((e as { message: string }).message)
		);
	}
}

function* listsSagas() {
	yield takeLatest(c.FETCH_ALL_LISTS_REQUEST, fetchListsEffect);
	yield takeLatest(c.FETCH_SINGLE_LIST_REQUEST, fetchListEffect);
	yield takeLatest(c.ADD_LIST_REQUEST, addListEffect);
	yield takeLatest(c.ADD_TASK_REQUEST, addListTaskEffect);
	yield takeLatest(c.REMOVE_TASK_REQUEST, removeListTaskEffect);
	yield takeLatest(c.TOGGLE_TASK_COMPL_REQUEST, toggleTaskCompletionEffect);
	yield takeLatest(c.CHANGE_TASK_ORDER_REQUEST, changeTaskListIndexEffect);
}

export default listsSagas;
