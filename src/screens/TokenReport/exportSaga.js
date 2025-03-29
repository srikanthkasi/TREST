import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
    EXPORT_TOKENS_REQUESTED,
    exportTokensFailed,
    exportTokensSucceeded,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { getRequestFields } from './selectors';

export function* fetchExport() {
    try {
        const query = yield select(getRequestFields);
        const response = yield call(fetchWithAuth, `exportTokens`, {
            method: 'GET',
            json: false,
            query,
        });
        const { error } = response;

        if (error && error.message) {
            yield put(exportTokensFailed(error.message));
        } else {
            const text = yield call([response, 'text']);
            yield put(exportTokensSucceeded(text));
        }
    } catch (error) {
        yield put(exportTokensFailed());
    }
}

export default function* () {
    yield all([takeLatest(EXPORT_TOKENS_REQUESTED, fetchExport)]);
}
