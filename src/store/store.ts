import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import authReducer from './auth/auth.reducers';
import authSagas from './auth/auth.sagas';
import listsReducer from './lists/lists.reducers';
import listsSagas from './lists/lists.sagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
	auth: authReducer,
	lists: listsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

export interface ReduxAction<T> {
	type: string;
	payload: T;
}

function* rootSaga() {
	yield all([authSagas(), listsSagas()]);
}

sagaMiddleware.run(rootSaga);
