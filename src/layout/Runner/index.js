import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import styles from './styles';

const Runner = ({ classes }) => {
    return (
        <Grid container xs={12} className={classes.root}>
            <Grid item xs="auto" className={classes.identity}>
                <span>
                    My<strong>FAA</strong>
                </span>
            </Grid>
        </Grid>
    );
};
Runner.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Runner);
