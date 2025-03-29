import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
    FETCH_TOKENS_REQUESTED,
    fetchTokensFailed,
    fetchTokensSucceeded,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { getPaginationContext, getRequestFields } from './selectors';

export function* fetchTokens() {
    try {
        const standardQuery = yield select(getRequestFields);
        const { itemsPerPage, pageIndex } = yield select(getPaginationContext);

        const query = {
            ...standardQuery,
            itemsPerPage,
            pageIndex,
        };
        const response = yield call(fetchWithAuth, `tokens`, {
            method: 'GET',
            query,
        });
        const { data: { items = [], totalItems } = {}, error } = response;
        if (error && error.message) {
            yield put(fetchTokensFailed(error.message));
        } else {
            yield put(fetchTokensSucceeded(items, totalItems));
        }
    } catch (error) {
        yield put(fetchTokensFailed());
    }
}

export default function* () {
    yield all([takeLatest(FETCH_TOKENS_REQUESTED, fetchTokens)]);
}
