import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select as MUISelect, withStyles } from '@material-ui/core';
import styles from './styles';
import { ExpandMore } from '@material-ui/icons';

export const VARIANT_FILLED = 'filled';
export const VARIANT_OUTLINED = 'outlined';
export const VARIANT_STANDARD = 'standard';

export const COLOR_PRIMARY = 'primary';
export const COLOR_SECONDARY = 'secondary';

class Select extends Component {
    render() {
        const { classes, children, ...props } = this.props;
        return (
            <MUISelect
                classes={classes}
                inputProps={{
                    className: classes.input,
                }}
                IconComponent={ExpandMore}
                disableUnderline
                {...props}
            >
                {children}
            </MUISelect>
        );
    }
}

Select.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    // The children that will be rendered inside the button.
    children: PropTypes.node,
};

Select.defaultProps = {
    // Default variant.
    variant: VARIANT_FILLED,

    // Default to the primary color.
    color: COLOR_SECONDARY,

    // No children by default.
    children: null,
};

export default withStyles(styles)(Select);
