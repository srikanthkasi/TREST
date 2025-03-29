import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Screen from '../common/Screen';
import { getInitializationErrors, getInitializationStatus } from './selectors';
import {
    INIT_STATUS_INITIALIZED,
    INIT_STATUS_INITIALIZING,
    INIT_STATUSES,
} from './constants';
import CommonPropTypes from '../common/propTypes';
import ErrorList from '../common/errors/ErrorList';
import LoadingScreen from '../common/LoadingScreen';

function AppGate({ status, errors, children }) {
    if (status === INIT_STATUS_INITIALIZED) {
        return children();
    }

    if (status === INIT_STATUS_INITIALIZING) {
        return <LoadingScreen />;
    } else {
        return (
            <Screen>
                <ErrorList errors={errors} />
            </Screen>
        );
    }
}

AppGate.propTypes = {
    status: PropTypes.oneOf(INIT_STATUSES),
    errors: CommonPropTypes.errors,
    children: PropTypes.func,
};

AppGate.defaultProps = {
    status: INIT_STATUS_INITIALIZING,
    errors: null,
    children: () => null,
};

export default AppGate;

const mapStateToProps = (state) => ({
    status: getInitializationStatus(state),
    errors: getInitializationErrors(state),
});

export const ConnectedAppGate = connect(mapStateToProps)(AppGate);
