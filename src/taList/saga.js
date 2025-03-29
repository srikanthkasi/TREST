import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_TALIST_REQUESTED,
    fetchTaListFailed,
    fetchTaListSucceeded,
} from './actions';
import { fetchWithAuth } from '../store/api/sagas';
import {
    TEST_AUTHORITY_STATUS_ACTIVE,
    TEST_AUTHORITY_STATUS_INACTIVE,
} from '../testAuthorityConstants';

export function* fetchTaList({ search }) {
    try {
        const query = {
            allNames: true,
        };
        if (
            search === TEST_AUTHORITY_STATUS_INACTIVE ||
            search === TEST_AUTHORITY_STATUS_ACTIVE
        ) {
            query.status = search;
        }
        const response = yield call(fetchWithAuth, `testAuthorities`, {
            method: 'GET',
            query,
        });
        const { data: { items = [] } = {}, error } = response;
        if (error && error.message) {
            yield put(fetchTaListFailed(error.message));
        } else {
            yield put(fetchTaListSucceeded(items));
        }
    } catch (error) {
        yield put(fetchTaListFailed(error.message || error));
    }
}

export default function* () {
    yield all([takeLatest(FETCH_TALIST_REQUESTED, fetchTaList)]);
}
