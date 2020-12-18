import { applyMiddleware, createStore } from 'redux';
import { Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './RootReducer';
import rootSagas from './rootSagas';
import { StoreState } from './StoreState';

const sagaMiddleware = createSagaMiddleware();

let store: Store<StoreState>;

if (process.env.NODE_ENV === 'production') {
    store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );
} else {
    store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    );
}

sagaMiddleware.run(rootSagas);

export default store;