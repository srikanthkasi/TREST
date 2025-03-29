import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    SEARCH_TOKENS_REQUESTED,
    searchTokensFailed,
    searchTokensSucceeded,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';

export function* searchTokens({ tokenId }) {
    try {
        const response = yield call(fetchWithAuth, 'token', {
            query: { tokenId },
        });
        const { data: { items = [] } = {}, error } = response;

        if (error && error.message) {
            yield put(searchTokensFailed(error.message));
        } else {
            yield put(searchTokensSucceeded(items[0]));
        }
    } catch (error) {
        yield put(
            searchTokensFailed(
                'Searching for the token has failed. Please try again later.',
            ),
        );
    }
}

export default function* () {
    yield all([takeLatest(SEARCH_TOKENS_REQUESTED, searchTokens)]);
}
