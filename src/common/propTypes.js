import PropTypes from 'prop-types';

/**
 * A component class, function, or string (e.g. html element).
 *
 * @type {*}
 */
export const component = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
]);

/**
 * A single error or an array of errors. Can be passed to an ErrorList.
 *
 * @type {*}
 */
export const errors = PropTypes.oneOfType([
    PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({ message: PropTypes.string.isRequired }),
        ]),
    ),
    PropTypes.string,
    PropTypes.shape({ message: PropTypes.string.isRequired }),
]);

const CommonPropTypes = {
    component,
    errors,
};

export default CommonPropTypes;
