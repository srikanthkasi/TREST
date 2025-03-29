import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
    FETCH_TEST_AUTHORITIES_REQUESTED,
    fetchTestAuthoritiesFailed,
    fetchTestAuthoritiesSucceeded,
    setPageIndex,
    setPreviousSearch,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { NAME_FOR_TEST_AUTHORITY_STATUS_FIELD } from '../../testAuthorityConstants';
import { getPreviousSearch } from './selectors';

export function* fetchTestAuthorities({
    itemsPerPage,
    pageIndex,
    search,
    statusFilter,
    sortBy,
}) {
    try {
        const query = {
            itemsPerPage,
            pageIndex,
        };
        if (search) {
            query.search = search;
        }
        if (statusFilter) {
            query[NAME_FOR_TEST_AUTHORITY_STATUS_FIELD] = statusFilter;
        }
        if (sortBy && sortBy.length) {
            query.orderBy = [sortBy[0].id, sortBy[0].desc ? 'DESC' : 'ASC'];
        }
        const response = yield call(fetchWithAuth, `testAuthorities`, {
            method: 'GET',
            query,
        });
        const { data: { items = [], totalItems } = {}, error } = response;
        if (error && error.message) {
            yield put(fetchTestAuthoritiesFailed(error.message));
        } else {
            yield put(fetchTestAuthoritiesSucceeded(items, totalItems));
            const previousSearch = yield select(getPreviousSearch);
            if (search !== previousSearch) {
                // If the search changes, reset to first page.
                yield put(setPageIndex(0));
            }
            yield put(setPreviousSearch(search));
        }
    } catch (error) {
        yield put(fetchTestAuthoritiesFailed());
    }
}

export default function* () {
    yield all([
        takeLatest(FETCH_TEST_AUTHORITIES_REQUESTED, fetchTestAuthorities),
    ]);
}
