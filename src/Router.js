import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { ConnectedCreateTestAuthority } from './screens/CreateTestAuthority';
import { ConnectedAccountAdministration } from './screens/AccountAdministration';
import { ConnectedUserAdministration } from './screens/UserAdministration';
import { ConnectedTokenReport } from './screens/TokenReport';
import {
    APP_TITLE,
    ROUTE_ADMIN,
    ROUTE_ADMIN_CREATE_TEST_AUTHORITY,
    ROUTE_ADMIN_TEST_AUTHORITY_DETAILS,
    ROUTE_REPORTS,
    ROUTE_TITLE_CREATE_TEST_AUTHORITY,
    ROUTE_TITLE_HOME,
    ROUTE_TITLE_REPORTS,
    ROUTE_TITLE_TA_ACCOUNT_ADMINISTRATION,
    ROUTE_CHECK_FOR_TOKEN,
    ROUTE_USER_ADMIN,
    ROUTE_ADMIN_USER_DETAILS,
    ROUTE_TITLE_USER_ADMINISTRATION
} from './routeConstants';
import { ConnectedTestAuthorityDetails } from './screens/TestAuthorityDetails';
import { ConnectedUserDetails } from './screens/UserDetails';
import { ConnectedSearch } from './screens/Search';
import DocumentTitle from 'react-document-title';

function Router({ history }) {
    return (
        <DocumentTitle title={APP_TITLE}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route
                        path={ROUTE_REPORTS}
                        component={() => (
                            <DocumentTitle title={ROUTE_TITLE_REPORTS}>
                                <ConnectedTokenReport />
                            </DocumentTitle>
                        )}
                    />
                    <Route
                        path={ROUTE_ADMIN_CREATE_TEST_AUTHORITY}
                        component={() => (
                            <DocumentTitle
                                title={ROUTE_TITLE_CREATE_TEST_AUTHORITY}
                            >
                                <ConnectedCreateTestAuthority />
                            </DocumentTitle>
                        )}
                    />
                    <Route
                        path={ROUTE_ADMIN_TEST_AUTHORITY_DETAILS}
                        component={() => (
                            <DocumentTitle
                                title={ROUTE_TITLE_TA_ACCOUNT_ADMINISTRATION}
                            >
                                <ConnectedTestAuthorityDetails />
                            </DocumentTitle>
                        )}
                    />
                    <Route
                        path={ROUTE_ADMIN}
                        component={() => (
                            <DocumentTitle
                                title={ROUTE_TITLE_TA_ACCOUNT_ADMINISTRATION}
                            >
                                <ConnectedAccountAdministration />
                            </DocumentTitle>
                        )}
                    />
                    <Route
                        path={ROUTE_ADMIN_USER_DETAILS}
                        component={() => (
                            <DocumentTitle
                                title={ROUTE_TITLE_USER_ADMINISTRATION}
                            >
                                <ConnectedUserDetails />
                            </DocumentTitle>
                        )}
                    />
                    <Route
                        path={ROUTE_USER_ADMIN}
                        component={() => (
                            <DocumentTitle
                                title={ROUTE_TITLE_USER_ADMINISTRATION}
                            >
                                <ConnectedUserAdministration />
                            </DocumentTitle>
                        )}
                    />
                    <Route
                        path={ROUTE_CHECK_FOR_TOKEN}
                        component={() => (
                            <DocumentTitle title={ROUTE_TITLE_HOME}>
                                <ConnectedSearch />
                            </DocumentTitle>
                        )}
                    />
                    <Redirect to={ROUTE_REPORTS} />
                </Switch>
            </ConnectedRouter>
        </DocumentTitle>
    );
}

Router.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Router;
