import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import CommonPropTypes from '../../propTypes';
import styles from './styles';
import { coerceErrorsIntoErrorMessages } from '../';

function ErrorList({
    classes,
    className,
    component: Component,
    errorComponent: ErrorComponent,
    errors,
    ...restProps
}) {
    const parsedErrors = useMemo(() => coerceErrorsIntoErrorMessages(errors), [
        errors,
    ]);

    if (!parsedErrors) {
        return null;
    }

    return (
        <Component className={clsx([classes.root, className])} {...restProps}>
            {parsedErrors.map((error) => (
                <ErrorComponent className={classes.error} key={error}>
                    {error}
                </ErrorComponent>
            ))}
        </Component>
    );
}

ErrorList.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: CommonPropTypes.component,
    errorComponent: CommonPropTypes.component,
    errors: CommonPropTypes.errors,
};

ErrorList.defaultProps = {
    className: null,
    component: 'div',
    errorComponent: 'div',
    errors: [],
};

export default withStyles(styles)(ErrorList);
