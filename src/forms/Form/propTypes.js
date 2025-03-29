import PropTypes from 'prop-types';

export const formPropTypes = {
    // Form title, if any
    title: PropTypes.string,

    // bool to determine if the Form is in a loading state.
    loading: PropTypes.bool,

    // Text to be used for the submit action button text.
    submitButtonText: PropTypes.string,

    // Function that will be called when the Form is submitted.
    onSubmit: PropTypes.func.isRequired,

    // The fields to render for this Form.
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            validation: PropTypes.object,
            // render(commonProps, allProps), see Form.renderFieldComponent
            render: PropTypes.func.isRequired,
        }),
    ),

    // Contains the initial state of the Form the be passed to Formik.
    initFormState: PropTypes.object,

    // Any props that should be spread onto the Formik Form.
    FormProps: PropTypes.object,

    // Errors for each of the fields from the API request - if any.
    errors: PropTypes.object,

    /*
     * Indicate whether or not you want to show a submit button
     */
    showSubmitButton: PropTypes.bool,

    // Any extra props to spread onto the submit button
    SubmitButtonProps: PropTypes.object,

    // For an extra action button
    ExtraActionButton: PropTypes.node,

    /*
     * Indicate whether or not you want to show a reset button
     * NOTE: In order for reset to work correctly, Formik requires a full set of initial state values
     */
    showResetButton: PropTypes.bool,

    // Supply a different button label (default: 'Reset')
    resetButtonName: PropTypes.string,

    // Called when reset button is pressed
    onReset: PropTypes.bool,
};

export default {
    formPropTypes,
};
