import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import initReducer from '../init/reducer';
import authReducer from '../auth/reducer';
import createTestAuthority from '../screens/CreateTestAuthority/reducer';
import testAuthorityDetails from '../screens/TestAuthorityDetails/reducer';
import accountAdministration from '../screens/AccountAdministration/reducer';
import userAdministration from '../screens/UserAdministration/reducer';
import userDetails from '../screens/UserDetails/reducer';
import taList from '../taList/reducer';
import tokenReport from '../screens/TokenReport/reducer';
import search from '../screens/Search/reducer';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        init: initReducer,
        auth: authReducer,
        createTestAuthority,
        testAuthorityDetails,
        accountAdministration,
        userAdministration,
        userDetails,
        taList,
        tokenReport,
        search,
    });
}
