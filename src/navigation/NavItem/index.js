import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import styles from './styles';
import CommonPropTypes from '../../common/propTypes';

function NavItem({ classes, className, component: Component, ...restProps }) {
    return (
        <Component className={clsx([classes.root, className])} {...restProps} />
    );
}

NavItem.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: CommonPropTypes.component,
};

NavItem.defaultProps = {
    className: null,
    component: 'a',
};

export default withStyles(styles)(NavItem);
