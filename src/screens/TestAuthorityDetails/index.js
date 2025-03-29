import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { formPropTypes } from '../../forms/Form/propTypes';
import Form from '../../forms/Form';
import { ConnectedMainLayout } from '../../layout/MainLayout';
import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import styles from './styles';
import {
    areTestAuthorityDetailsLoading,
    getTestAuthorityDetails,
    getTestAuthorityDetailsErrors,
    isTestAuthorityDetailsUpdateInProgress,
} from './selectors';
import {
    fetchTestAuthorityRequested,
    updateTestAuthorityRequested,
} from './actions';
import {
    getFieldsForUpdateTestAuthority,
    getLabelForExtraActionButton,
    SUBMIT_BUTTON_TEXT_FOR_UPDATE_TEST_AUTHORITY,
    TITLE_FOR_UPDATE_TEST_AUTHORITY,
} from './constants';
import { noop } from '../../common/utils';
import Button, { VARIANT_OUTLINED } from '../../common/Button';
import {
    TEST_AUTHORITY_STATUS_ACTIVE,
    TEST_AUTHORITY_STATUS_INACTIVE,
} from '../../testAuthorityConstants';
import { ROUTE_ADMIN } from '../../routeConstants';

const TestAuthorityDetails = (props) => {
    const {
        classes,
        onLoad,
        onClickClose,
        loading,
        initFormState,
        errors,
        updateInProgress,
        submitButtonText,
        onSubmit,
        ...restProps
    } = props;
    const { taId } = useParams();
    useEffect(() => {
        onLoad(taId);
    }, [taId, onLoad]);
    const renderForm = useCallback(() => {
        const SubmitButtonProps = {};
        const FormProps = {};
        if (updateInProgress) {
            SubmitButtonProps.disabled = true;
            FormProps.isSubmitting = true;
        }
        const { status } = initFormState;
        return (
            <Form
                fields={getFieldsForUpdateTestAuthority(classes)}
                initFormState={initFormState}
                loading={loading}
                key={loading ? null : taId}
                errors={errors}
                submitButtonText={
                    updateInProgress ? (
                        <CircularProgress size={24} />
                    ) : (
                        submitButtonText
                    )
                }
                SubmitButtonProps={SubmitButtonProps}
                FormProps={FormProps}
                ExtraActionButton={() => (
                    <Grid container justify="space-between">
                        <Grid item xs="auto">
                            <Button
                                className={classes.extraButton}
                                disabled={loading || updateInProgress}
                                variant={VARIANT_OUTLINED}
                                onClick={() => {
                                    onSubmit({
                                        status:
                                            status ===
                                            TEST_AUTHORITY_STATUS_ACTIVE
                                                ? TEST_AUTHORITY_STATUS_INACTIVE
                                                : TEST_AUTHORITY_STATUS_ACTIVE,
                                        taId,
                                    });
                                }}
                            >
                                {updateInProgress ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    getLabelForExtraActionButton(
                                        initFormState.status,
                                    )
                                )}
                            </Button>
                        </Grid>
                        <Grid item xs="auto">
                            <Button
                                variant={VARIANT_OUTLINED}
                                onClick={onClickClose}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                )}
                onSubmit={({ status, ...values }) => {
                    onSubmit({ taId, ...values });
                }}
                {...restProps}
            />
        );
    }, [
        classes,
        taId,
        restProps,
        initFormState,
        loading,
        errors,
        updateInProgress,
        submitButtonText,
        onSubmit,
        onClickClose,
    ]);
    return (
        <Grid container className={classes.root}>
            <Grid container item>
                {renderForm()}
            </Grid>
        </Grid>
    );
};

TestAuthorityDetails.propTypes = {
    // From withStyles we expect to get classes.
    classes: PropTypes.object.isRequired,

    // Function to be called in useEffect hook
    onLoad: PropTypes.func,

    // Indicate whether or not the update is in progress.
    updateInProgress: PropTypes.bool,

    // Handle the acton of clicking button Close
    onClickClose: PropTypes.func,

    // All form prop types.
    ...formPropTypes,
};

TestAuthorityDetails.defaultProps = {
    title: TITLE_FOR_UPDATE_TEST_AUTHORITY,
    submitButtonText: SUBMIT_BUTTON_TEXT_FOR_UPDATE_TEST_AUTHORITY,
    onLoad: noop,
    onClickClose: noop,
    updateInProgress: false,
};

const StyledTestAuthorityDetails = withStyles(styles)(TestAuthorityDetails);
export default StyledTestAuthorityDetails;

const mapStateToProps = (state) => ({
    loading: areTestAuthorityDetailsLoading(state),
    updateInProgress: isTestAuthorityDetailsUpdateInProgress(state),
    initFormState: getTestAuthorityDetails(state),
    errors: getTestAuthorityDetailsErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (taId) => dispatch(fetchTestAuthorityRequested(taId)),
    onSubmit: (testAuthority) =>
        dispatch(updateTestAuthorityRequested(testAuthority)),
});

export const ConnectedTestAuthorityDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    const history = useHistory();
    return (
        <ConnectedMainLayout>
            <StyledTestAuthorityDetails
                onClickClose={() => history.push(ROUTE_ADMIN)}
                {...props}
            />
        </ConnectedMainLayout>
    );
});
