import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';

import styles from './styles';

class Autocomplete extends Component {
    render() {
        const { classes, children, ...props } = this.props;
        return (
            <MUIAutocomplete classes={classes} {...props}>
                {children}
            </MUIAutocomplete>
        );
    }
}

Autocomplete.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    // The children that will be rendered inside the button.
    children: PropTypes.node,
};

Autocomplete.defaultProps = {
    // No children by default.
    children: null,
};

export default withStyles(styles)(Autocomplete);
