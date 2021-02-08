import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";
import authReducer from "./auth/auth.reducers";
import authSagas from "./auth/auth.sagas";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

function* rootSaga() {
    yield all([
        authSagas(),
    ]);
}

sagaMiddleware.run(rootSaga);
