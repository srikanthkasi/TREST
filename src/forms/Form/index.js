import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    CircularProgress,
    Grid,
    Paper,
    Typography,
    withStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import { has } from 'ramda';
import * as Yup from 'yup';
import styles from './styles';
import Button, { VARIANT_OUTLINED } from '../../common/Button';
import { noop } from '../../common/utils';
import { formPropTypes } from './propTypes';

/**
 *
 * Helper to extract common used values from formik props.
 * Result of this helper is passed as the first argument to the `render` function of the field definition.
 * @see DetailForm.propTypes.fields
 * @param name
 * @param values
 * @param handleChange
 * @param errors
 * @returns {{name: <string>, onChange: <func>, value: *, values: <*[]>, error: <string>}}
 */
export const extractCommonFormikProps = ({
    name,
    values,
    handleChange,
    errors,
}) => {
    const value = values[name];
    return {
        values,
        value,
        error: errors[name] || null,
        onChange: handleChange,
        name,
    };
};

const Form = ({
    classes,
    title,
    loading,
    submitButtonText,
    onSubmit,
    fields,
    initFormState,
    errors,
    FormProps,
    showSubmitButton,
    SubmitButtonProps,
    ExtraActionButton,
    showResetButton,
    resetButtonName,
    onReset,
    handleReset,
}) => {
    /**
     * used to call the render prop for each field
     * render is passed 2 arguments:
     *  1. an object with only common props // @see: extractCommonFormikProps above
     *  2. an object containing formiks props merged with all properties passed into the fields definition
     * @param props
     * @returns {*}
     */
    const renderFieldComponent = (props) => {
        // eslint-disable-next-line react/prop-types
        const { render = noop } = props;
        return render(
            extractCommonFormikProps({
                ...props,
                errors: {
                    ...errors,
                    ...props.errors,
                },
            }),
            props,
        );
    };

    const renderFormBody = (formikProps) => {
        return fields.map((field) => {
            const { name } = field;
            return (
                <Grid item key={name}>
                    {renderFieldComponent({
                        ...field,
                        ...formikProps,
                    })}
                </Grid>
            );
        });
    };

    const renderExtraActionButton = useCallback(() => {
        return ExtraActionButton ? <ExtraActionButton /> : null;
    }, [ExtraActionButton]);

    const renderActionButtons = (formikProps) => {
        const { handleSubmit, isValid } = formikProps;
        return (
            <>
                <Grid
                    item
                    justify="space-between"
                    className={classes.extraActionGrow}
                >
                    {renderExtraActionButton()}
                </Grid>
                <Grid item justify="flex-end" xs="auto">
                    <Grid container justify="space-between">
                        {showResetButton ? (
                            <Grid item xs="auto">
                                <Button
                                    variant={VARIANT_OUTLINED}
                                    onClick={(event) => {
                                        const {
                                            handleReset = noop,
                                        } = formikProps;
                                        handleReset();
                                        onReset();
                                    }}
                                >
                                    {resetButtonName || 'Reset'}
                                </Button>
                            </Grid>
                        ) : null}
                        {showSubmitButton ? (
                            <Grid item xs="auto" className={classes.submitButton}>
                                <Button
                                    disabled={!isValid || loading}
                                    onClick={handleSubmit}
                                    {...SubmitButtonProps}
                                >
                                    {submitButtonText}
                                </Button>
                            </Grid>
                        ) : null}
                    </Grid>
                </Grid>
            </>
        );
    };

    /**
     * Helper that goes through the field definition for this Form and adds all of the validation rules to the YUP validation schema
     * for this Form
     * @returns {*}
     */
    const getValidationSchemaFromFieldDefinition = () => {
        const schema = fields.reduce((schema, fieldDef) => {
            let validation = has('validation', fieldDef)
                ? fieldDef.validation
                : null;
            // verify that the validation value is set and a valid Yup schema
            if (validation && Yup.isSchema(validation)) {
                // the label is used for the error description rather that the field's name
                if (has('label', fieldDef)) {
                    validation = validation.label(fieldDef.label);
                }
                schema[fieldDef.name] = validation;
            }
            return schema;
        }, {});
        return Yup.object().shape(schema);
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initFormState}
            validationSchema={getValidationSchemaFromFieldDefinition()}
            onSubmit={onSubmit}
            errors={errors}
            {...FormProps}
        >
            {(formikProps) => (
                <>
                    <Grid
                        container
                        direction="column"
                        spacing={4}
                        component={Paper}
                        className={classes.paper}
                    >
                        {title && (
                            <Grid container item>
                                <Grid
                                    item
                                    component={Typography}
                                    color="primary"
                                    gutterBottom
                                    className={classes.title}
                                >
                                    {title}
                                </Grid>
                            </Grid>
                        )}
                        <Typography
                            className={classes.requiredFieldMessage}
                            tabIndex={0}
                        >
                            * Required field
                        </Typography>
                        {loading ? (
                            <Grid container item justify="center">
                                <Grid item component={CircularProgress} />
                            </Grid>
                        ) : (
                            renderFormBody(formikProps)
                        )}
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            className={classes.actionButtons}
                        >
                            {renderActionButtons(formikProps)}
                        </Grid>
                    </Grid>
                </>
            )}
        </Formik>
    );
};

Form.propTypes = {
    // From withStyles we expect to get classes.
    classes: PropTypes.object.isRequired,

    // All form prop types.
    ...formPropTypes,
};

Form.defaultProps = {
    title: '',
    loading: false,
    submitButtonText: 'Save',
    fields: [],
    initFormState: {}, // this requires a key/value pair of all fields to be reset for reset to function (verified)
    FormProps: {},
    showSubmitButton: true,
    SubmitButtonProps: {},
    ExtraActionButton: null,
    showResetButton: false,
    onReset: noop,
};

export default withStyles(styles)(Form);
