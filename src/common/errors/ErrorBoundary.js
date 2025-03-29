import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorList from './ErrorList';
import CommonPropTypes from '../propTypes';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        // TODO Log to Sentry, etc.
        // eslint-disable-next-line no-console
        console.error(error, errorInfo);
    }

    _constructMessageFromError() {
        const { error } = this.state;
        const { overrideMessage, fallbackMessage, debug } = this.props;

        if (error) {
            if (overrideMessage) {
                return overrideMessage;
            } else if (debug && error.message) {
                return error.name
                    ? `${error.name}: ${error.message}`
                    : error.message;
            } else {
                return fallbackMessage;
            }
        }

        return null;
    }

    render() {
        const { error } = this.state;
        const { children, component: Component } = this.props;

        if (error) {
            const errorList = (
                <ErrorList errors={this._constructMessageFromError()} />
            );
            return Component ? <Component>{errorList}</Component> : errorList;
        }

        return children;
    }
}

ErrorBoundary.propTypes = {
    overrideMessage: PropTypes.string,
    fallbackMessage: PropTypes.string,
    debug: PropTypes.bool,
    component: CommonPropTypes.component,
    children: PropTypes.node,
};

ErrorBoundary.defaultProps = {
    overrideMessage: null,
    fallbackMessage:
        'An unknown error has occurred. Try reloading the page. Sorry for the inconvenience!',
    debug: process.env.NODE_ENV === 'development',
    component: null,
    children: null,
};

export default ErrorBoundary;
