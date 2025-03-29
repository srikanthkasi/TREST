import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import faaLogo from './faa-logo.png';

const styles = () => ({
    root: {
        height: 65,
    },
});

const DotLogo = ({ classes }) => (
    <img
        src={faaLogo}
        alt="Federal Aviation Administration"
        className={classes.root}
    />
);

DotLogo.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DotLogo);
