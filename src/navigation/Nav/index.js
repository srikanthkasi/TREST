import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import styles from './styles';
import CommonPropTypes from '../../common/propTypes';

function Nav({ classes, className, component: Component, ...restProps }) {
    return (
        <Component className={clsx([classes.root, className])} {...restProps} />
    );
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: CommonPropTypes.component,
};

Nav.defaultProps = {
    component: 'nav',
    className: null,
};

export default withStyles(styles)(Nav);
