import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './styles';
import NavItem from '../NavItem';

function NavItemLink({
    classes,
    rootClassName,
    activeClassName,
    ...restProps
}) {
    return (
        <Grid item className={clsx([classes.root, rootClassName])}>
            <NavItem
                component={NavLink}
                activeClassName={clsx([classes.active, activeClassName])}
                {...restProps}
            />
        </Grid>
    );
}

NavItemLink.propTypes = {
    classes: PropTypes.object.isRequired,
    rootClassName: PropTypes.string,
    activeClassName: PropTypes.string,
};

NavItemLink.defaultProps = {
    rootClassName: null,
    activeClassName: null,
};

export default withStyles(styles)(NavItemLink);
