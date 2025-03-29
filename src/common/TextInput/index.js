import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, TextField, withStyles } from '@material-ui/core';
import styles from './styles';

export const VARIANT_OUTLINED = 'outlined';
export const VARIANT_FILLED = 'filled';

const TextInput = (props) => {
    const {
        classes,
        children,
        InputProps,
        fieldLabel,
        error,
        required,
        ...restProps
    } = props;
    const id = restProps?.id || restProps?.name ? restProps.name : null;
    const fieldTitle =
        typeof fieldLabel === 'string'
            ? `${fieldLabel}${required ? '*' : ''}`
            : fieldLabel;
    return (
        <>
            {fieldLabel && (
                <InputLabel
                    htmlFor={id}
                    title={fieldTitle}
                    className={
                        error ? classes.errorFieldLabel : classes.fieldLabel
                    }
                >
                    {fieldTitle}
                </InputLabel>
            )}
            <TextField
                fullWidth
                error={!!error}
                classes={classes}
                required={required}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        input: classes.input,
                    },
                    ...InputProps,
                }}
                id={id}
                helperText={error}
                {...restProps}
            >
                {children}
            </TextField>
        </>
    );
};

TextInput.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    // The children that will be rendered inside the button.
    children: PropTypes.node,

    // To add to or override any InputProps, See TextField docs for valid shape.
    InputProps: PropTypes.object,

    // Label to put above the text field (if any)
    fieldLabel: PropTypes.string,

    // Any error text to go under the field.
    error: PropTypes.string,

    // Indicate if the field is required or not
    required: PropTypes.bool,
};

TextInput.defaultProps = {
    // Defaults to this variant.
    variant: VARIANT_FILLED,

    // No children by default.
    children: null,

    // No additional InputProps by default.
    InputProps: {},

    // No default label.
    fieldLabel: null,

    // No error by default.
    error: null,

    // Not required by default
    required: false,
};

export default withStyles(styles)(TextInput);
