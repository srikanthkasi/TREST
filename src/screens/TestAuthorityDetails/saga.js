import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_TEST_AUTHORITY_REQUESTED,
    fetchTestAuthorityFailed,
    fetchTestAuthoritySucceeded,
    UPDATE_TEST_AUTHORITY_REQUESTED,
    updateTestAuthorityFailed,
    updateTestAuthoritySucceeded,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { push } from 'react-router-redux';
import { ROUTE_ADMIN } from '../../routeConstants';

export function* fetchTestAuthority({ taId }) {
    try {
        const response = yield call(fetchWithAuth, `testAuthorities/${taId}`, {
            method: 'GET',
        });
        const { data: { items = [] } = {}, error } = response;
        if (error && error.message) {
            yield put(fetchTestAuthorityFailed(error.message));
        } else if (items.length === 0 || (items.length > 0 && !items[0])) {
            const errorMessage = `Test Administrator not found for Test Administrator ID ${taId}`;
            yield put(fetchTestAuthorityFailed(errorMessage));
            alert(errorMessage);
            yield put(push(ROUTE_ADMIN));
        } else {
            const fetchedTA = items.length ? items[0] : null;
            yield put(fetchTestAuthoritySucceeded(fetchedTA));
        }
    } catch (error) {
        yield put(fetchTestAuthorityFailed());
    }
}

export function* updateTestAuthority({ testAuthority }) {
    try {
        const { taId, ...body } = testAuthority;
        const response = yield call(fetchWithAuth, `testAuthorities/${taId}`, {
            method: 'PUT',
            body,
        });
        const { data: { items = [] } = {}, error } = response;
        if (error && error.message) {
            yield put(updateTestAuthorityFailed(error.message, testAuthority));
        } else {
            const updatedTA = items.length ? items[0] : null;
            alert('Success: Test Authority updated!');
            yield put(updateTestAuthoritySucceeded(updatedTA));
        }
    } catch (error) {
        yield put(
            updateTestAuthorityFailed(
                'Error occurred while updating Test Administrator, please try again later.',
                testAuthority,
            ),
        );
    }
}

export default function* () {
    yield all([
        takeLatest(FETCH_TEST_AUTHORITY_REQUESTED, fetchTestAuthority),
        takeLatest(UPDATE_TEST_AUTHORITY_REQUESTED, updateTestAuthority),
    ]);
}
