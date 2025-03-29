import React from 'react';
import PropTypes from 'prop-types';
import CommonPropTypes from './propTypes';

function Loading({ component: Component, children, ...restProps }) {
    return <Component {...restProps}>{children}</Component>;
}

Loading.propTypes = {
    component: CommonPropTypes.component,
    children: PropTypes.node,
};

Loading.defaultProps = {
    component: 'div',
    children: 'Loading...',
};

export default Loading;
