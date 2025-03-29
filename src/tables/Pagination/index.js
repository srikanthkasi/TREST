import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as MuiPagination } from '@material-ui/lab';

const Pagination = (props) => {
    return <MuiPagination {...props} />;
};

Pagination.propTypes = {
    count: PropTypes.number,
};

Pagination.defaultProps = {
    count: 0,
    color: 'primary',
    size: 'small',
};

export default Pagination;
