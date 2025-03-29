import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import CommonPropTypes from '../propTypes';
import styles from './styles';

function Screen({ classes, component: Component, className, ...restProps }) {
    return (
        <Component className={clsx([classes.root, className])} {...restProps} />
    );
}

Screen.propTypes = {
    classes: PropTypes.object.isRequired,
    component: CommonPropTypes.component,
    className: PropTypes.string,
};

Screen.defaultProps = {
    component: 'main',
    className: null,
};

export default withStyles(styles)(Screen);
