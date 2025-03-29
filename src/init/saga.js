import { put } from 'redux-saga/effects';
import { authenticationRequested } from '../auth/actions';

export default function* initSaga() {
    yield put(authenticationRequested());
}
