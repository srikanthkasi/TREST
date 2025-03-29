import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import styles from './styles';
import Screen from '../Screen';
import Loading from '../Loading';

function LoadingScreen({ classes, className, LoadingProps, ...restProps }) {
    return (
        <Screen className={clsx([classes.root, className])} {...restProps}>
            <Loading {...LoadingProps} />
        </Screen>
    );
}

LoadingScreen.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    LoadingProps: PropTypes.object,
};

LoadingScreen.defaultProps = {
    className: null,
    LoadingProps: {},
};

export default withStyles(styles)(LoadingScreen);
