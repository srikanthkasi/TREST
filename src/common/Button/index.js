import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button as MUIButton,
    CircularProgress,
    withStyles,
} from '@material-ui/core';
import styles from './styles';

export const VARIANT_OUTLINED = 'outlined';
export const VARIANT_CONTAINED = 'contained';
export const VARIANT_TEXT = 'text';

export const COLOR_PRIMARY = 'primary';
export const COLOR_SECONDARY = 'secondary';

export const BUTTON_SIZE_SMALL = 'small';
export const BUTTON_SIZE_MEDIUM = 'medium';
export const BUTTON_SIZE_LARGE = 'large';

class Button extends Component {
    render() {
        const { children, loading, loadingProps, ...props } = this.props;
        return (
            <MUIButton {...props}>
                {loading ? (
                    <CircularProgress size={20} {...loadingProps} />
                ) : (
                    children
                )}
            </MUIButton>
        );
    }
}

Button.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    // The children that will be rendered inside the button.
    children: PropTypes.node,

    // Show a loading indicator?
    loading: PropTypes.bool,

    // Extra proprs for the Circular progress component rendered inside the button if loading is true.
    loadingProps: PropTypes.object,
};

Button.defaultProps = {
    // Default variant.
    variant: VARIANT_CONTAINED,

    // Default to the primary color.
    color: COLOR_PRIMARY,

    // Most buttons are large so default to that.
    size: BUTTON_SIZE_LARGE,

    // No children by default.
    children: null,

    // Not loading by default.
    loading: false,

    // Nothing to spread by default
    loadingProps: {},
};

export default withStyles(styles)(Button);
