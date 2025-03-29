import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
    CREATE_TEST_AUTHORITY_REQUESTED,
    createTestAuthorityFailed,
    createTestAuthoritySucceeded,
} from './actions';
import { fetchWithAuth } from '../../store/api/sagas';
import { getUserEmail } from '../../auth/selectors';
import { ROUTE_ADMIN } from '../../routeConstants';
import {
    LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
    LABEL_FOR_TEST_AUTHORITY_ID,
    LABEL_FOR_TEST_AUTHORITY_NAME,
} from '../../testAuthorityConstants';
import { transformTestAuthorityForCreate } from './transforms';

export function* createTestAuthority({ testAuthority }) {
    try {
        const userName = yield select(getUserEmail);
        const body = {
            ...transformTestAuthorityForCreate(testAuthority),
            createdBy: userName,
            modifiedBy: userName,
        };
        const response = yield call(fetchWithAuth, 'testAuthorities', {
            method: 'POST',
            body,
        });
        const { data: { items = [] } = {}, error } = response;
        if (error && error.message) {
            yield put(createTestAuthorityFailed(error.message));
        } else {
            const createdTA = items.length ? items[0] : null;
            yield put(createTestAuthoritySucceeded(createdTA));
            const { name, taId, email } = createdTA;
            alert(
                'Success: Test Administrator created!\n\n' +
                    `${LABEL_FOR_TEST_AUTHORITY_NAME}: ${name}\n` +
                    `${LABEL_FOR_TEST_AUTHORITY_ID}: ${taId}\n` +
                    `${LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS}:  ${email}\n\n`
            );
            yield put(push(ROUTE_ADMIN));
        }
    } catch (error) {
        yield put(createTestAuthorityFailed());
    }
}

export default function* () {
    yield takeLatest(CREATE_TEST_AUTHORITY_REQUESTED, createTestAuthority);
}
