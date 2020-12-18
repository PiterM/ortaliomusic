import { all, CallEffect, fork, ForkEffect, TakeEffect } from 'redux-saga/effects';

const sagas: Array<() => IterableIterator<ForkEffect | CallEffect | TakeEffect>> = [
    // watchConfiguration,
];

function* globalSagas() {
    const globalSagasForks = sagas.map((saga) => fork(saga));

    yield all([...globalSagasForks]);
}

export default globalSagas;
