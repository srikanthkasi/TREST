import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_USER_REQUESTED,
    fetchUserFailed,
    fetchUserSucceeded,
    UPDATE_USER_REQUESTED,
    updateUserFailed,
    updateUserSucceeded,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { push } from 'react-router-redux';
import { ROUTE_USER_ADMIN } from '../../routeConstants';

export function* fetchUser({ id }) {
    try {
        const response = yield call(fetchWithAuth, `users/${id}`, {
            method: 'GET',
        });
        const { data: { items = [] } = {}, error } = response;
        if (error && error.message) {
            yield put(fetchUserFailed(error.message));
        } else if (items.length === 0 || (items.length > 0 && !items[0])) {
            const errorMessage = `User not found for User ID ${id}`;
            yield put(fetchUserFailed(errorMessage));
            alert(errorMessage);
            yield put(push(ROUTE_USER_ADMIN));
        } else {
            const fethedUser = items.length ? items[0] : null;
            yield put(fetchUserSucceeded(fethedUser));
        }
    } catch (error) {
        yield put(fetchUserFailed());
    }
}

export function* updateUser({ user }) {
    try {
        const { id, ...body } = user;
        const response = yield call(fetchWithAuth, `users/${id}`, {
            method: 'PUT',
            body,
        });
        const { data: { items = [] } = {}, error } = response;
        if (error && error.message) {
            yield put(updateUserFailed(error.message, user));
        } else {
            const updatedUser = items.length ? items[0] : null;
            alert('Success: User updated!');
            yield put(updateUserSucceeded(updatedUser));
        }
    } catch (error) {
        yield put(
            updateUserFailed(
                'Error occurred while updating User, please try again later.',
                user,
            ),
        );
    }
}

export default function* () {
    yield all([
        takeLatest(FETCH_USER_REQUESTED, fetchUser),
        takeLatest(UPDATE_USER_REQUESTED, updateUser),
    ]);
}
