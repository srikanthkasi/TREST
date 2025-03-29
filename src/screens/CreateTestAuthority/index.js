import React from 'react';
import { formPropTypes } from '../../forms/Form/propTypes';
import Form from '../../forms/Form';
import { useHistory } from 'react-router-dom';
import { ROUTE_ADMIN } from '../../routeConstants';
import {
    FIELDS_FOR_CREATE_TEST_AUTHORITY,
    TITLE_FOR_CREATE_TEST_AUTHORITY,
    SUBMIT_BUTTON_TEXT_FOR_CREATE_TEST_AUTHORITY,
} from './constants';
import { TEST_AUTHORITY_INITAL_VALUES_MAP } from '../../testAuthorityConstants';
import { ConnectedMainLayout } from '../../layout/MainLayout';
import { connect } from 'react-redux';

import { Grid, withStyles } from '@material-ui/core';
import styles from './styles';
import PropTypes from 'prop-types';
import {
    getCreateTestAuthorityErrors,
    isCreateTestAuthorityLoading,
} from './selectors';
import { createTestAuthorityRequested } from './actions';

const CreateTestAuthority = (props) => {
    const { classes, ...restProps } = props;
    return (
        <Grid container className={classes.root}>
            <Grid container item>
                <Form {...restProps} />
            </Grid>
        </Grid>
    );
};

CreateTestAuthority.propTypes = {
    // From withStyles we expect to get classes.
    classes: PropTypes.object.isRequired,

    // All form prop types.
    ...formPropTypes,
};

CreateTestAuthority.defaultProps = {
    fields: FIELDS_FOR_CREATE_TEST_AUTHORITY,
    title: TITLE_FOR_CREATE_TEST_AUTHORITY,
    initFormState: TEST_AUTHORITY_INITAL_VALUES_MAP,
    showResetButton: true,
    resetButtonName: 'Cancel',
    submitButtonText: SUBMIT_BUTTON_TEXT_FOR_CREATE_TEST_AUTHORITY,
};

const StyledCreateTestAuthority = withStyles(styles)(CreateTestAuthority);
export default StyledCreateTestAuthority;

const mapStateToProps = (state) => ({
    loading: isCreateTestAuthorityLoading(state),
    errors: getCreateTestAuthorityErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (testAuthority) =>
        dispatch(createTestAuthorityRequested(testAuthority)),
});

export const ConnectedCreateTestAuthority = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    const history = useHistory();
    return (
        <ConnectedMainLayout>
            <StyledCreateTestAuthority
                onReset={() => history.push(ROUTE_ADMIN)}
                {...props}
            />
        </ConnectedMainLayout>
    );
});
