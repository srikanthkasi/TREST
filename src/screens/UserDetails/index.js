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
    areUserDetailsLoading,
    getUserDetails,
    getUserDetailsErrors,
    isUserDetailsUpdateInProgress,
} from './selectors';
import {
    fetchUserRequested,
    updateUserRequested,
} from './actions';
import {
    getFieldsForUpdateUser,
    getLabelForExtraActionButton,
    SUBMIT_BUTTON_TEXT_FOR_APPROVE_USER,
    TITLE_FOR_UPDATE_USER,
} from './constants';
import { noop } from '../../common/utils';
import Button, { VARIANT_OUTLINED } from '../../common/Button';
import {
    USER_STATUS_AUTHORIZED,
    USER_STATUS_UNAUTHORIZED,
} from '../../userConstants';
import { ROUTE_USER_ADMIN } from '../../routeConstants';

const UserDetails = (props) => {
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
    const { id } = useParams();
    useEffect(() => {
        onLoad(id);
    }, [id, onLoad]);
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
                fields={getFieldsForUpdateUser(classes)}
                initFormState={initFormState}
                loading={loading}
                key={loading ? null : id}
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
                                            USER_STATUS_AUTHORIZED
                                                ? USER_STATUS_UNAUTHORIZED
                                                : USER_STATUS_AUTHORIZED,
                                        id,
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
                    onSubmit({ id, ...values });
                }}
                {...restProps}
            />
        );
    }, [
        classes,
        id,
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

UserDetails.propTypes = {
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

UserDetails.defaultProps = {
    title: TITLE_FOR_UPDATE_USER,
    showSubmitButton: false,
    submitButtonText: SUBMIT_BUTTON_TEXT_FOR_APPROVE_USER,
    onLoad: noop,
    onClickClose: noop,
    updateInProgress: false,
};

const StyledUserDetails = withStyles(styles)(UserDetails);
export default StyledUserDetails;

const mapStateToProps = (state) => ({
    loading: areUserDetailsLoading(state),
    updateInProgress: isUserDetailsUpdateInProgress(state),
    initFormState: getUserDetails(state),
    errors: getUserDetailsErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (id) => dispatch(fetchUserRequested(id)),
    onSubmit: (user) =>
        dispatch(updateUserRequested(user)),
});

export const ConnectedUserDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)((props) => {
    const history = useHistory();
    return (
        <ConnectedMainLayout>
            <StyledUserDetails
                onClickClose={() => history.push(ROUTE_USER_ADMIN)}
                {...props}
            />
        </ConnectedMainLayout>
    );
});
