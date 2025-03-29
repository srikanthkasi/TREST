import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/TextInput';
import { toAlphaNumericUppercase } from '../../utils/strings';
import { noop } from '../../common/utils';

const SearchTextInput = ({ onChange, value, ...restProps }) => (
    <TextInput
        onChange={(event) => {
            const search = event.target.value
                ? toAlphaNumericUppercase(event.target.value)
                : '';
            onChange(search);
        }}
        value={value}
        name="search"
        {...restProps}
    />
);

SearchTextInput.propTypes = {
    // Argument passed back will be the search text box value.
    onChange: PropTypes.func,

    // Value to be displayed in the search box, if any.
    value: PropTypes.string,
};

SearchTextInput.defaultProps = {
    onChange: noop,
    value: null,
};

export default SearchTextInput;
