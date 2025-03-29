import { all, call } from 'redux-saga/effects';
import initSaga from '../init/saga';
import validateAuth from '../auth/saga';
import createTestAuthority from '../screens/CreateTestAuthority/saga';
import testAuthorityDetails from '../screens/TestAuthorityDetails/saga';
import accountAdministration from '../screens/AccountAdministration/saga';
import userAdministration from '../screens/UserAdministration/saga';
import userDetails from '../screens/UserDetails/saga';
import taList from '../taList/saga';
import tokenReport from '../screens/TokenReport/saga';
import tokenExport from '../screens/TokenReport/exportSaga';
import search from '../screens/Search/saga';

export default function* rootSaga() {
    yield all([
        call(initSaga),
        call(validateAuth),
        call(createTestAuthority),
        call(testAuthorityDetails),
        call(accountAdministration),
        call(userAdministration),
        call(userDetails),
        call(taList),
        call(tokenReport),
        call(tokenExport),
        call(search),
    ]);
}
