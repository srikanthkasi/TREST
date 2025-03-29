import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';
import styles from './styles';
import FaaLogo from './FaaLogo';

class Footer extends Component {
    render() {
        const { classes, logoText } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="stretch"
                className={classes.root}
            >
                <Grid item alignItems="flex-start" xs="auto">
                    <Grid container alignItems="center" spacing={4}>
                        <Grid item component={FaaLogo} />
                        <Grid item>
                            <Typography
                                color="primary"
                                className={classes.text}
                            >
                                {logoText}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Footer.propTypes = {
    // From withStyles we expect to get classes
    classes: PropTypes.object.isRequired,

    logoText: PropTypes.string.isRequired,
};

Footer.defaultProps = {
    logoText: 'Federal Aviation Administration',
};

export default withStyles(styles)(Footer);
