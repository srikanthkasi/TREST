import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import {
    FETCH_USERS_REQUESTED,
    fetchUsersFailed,
    fetchUsersSucceeded,
    setPageIndex,
    setPreviousSearch,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { NAME_FOR_USER_STATUS_FIELD } from '../../userConstants';
import { getPreviousSearch } from './selectors';

export function* fetchUsers({
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
            query[NAME_FOR_USER_STATUS_FIELD] = statusFilter;
        }
        if (sortBy && sortBy.length) {
            query.orderBy = [sortBy[0].id, sortBy[0].desc ? 'DESC' : 'ASC'];
        }
        const response = yield call(fetchWithAuth, `users`, {
            method: 'GET',
            query,
        });
        const { data: { items = [], totalItems } = {}, error } = response;
        if (error && error.message) {
            yield put(fetchUsersFailed(error.message));
        } else {
            yield put(fetchUsersSucceeded(items, totalItems));
            const previousSearch = yield select(getPreviousSearch);
            if (search !== previousSearch) {
                // If the search changes, reset to first page.
                yield put(setPageIndex(0));
            }
            yield put(setPreviousSearch(search));
        }
    } catch (error) {
        yield put(fetchUsersFailed());
    }
}

export default function* () {
    yield all([
        takeLatest(FETCH_USERS_REQUESTED, fetchUsers),
    ]);
}
