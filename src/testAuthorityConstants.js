import React from 'react';
import TextInput from './common/TextInput';
import * as Yup from 'yup';

export const LABEL_FOR_TEST_AUTHORITY_ID = 'Test Administrator Identifier';
export const SHORT_LABEL_FOR_TEST_AUTHORITY_ID = 'TA Identifier';
export const LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS = 'Email Address';
export const LABEL_FOR_TEST_AUTHORITY_NAME = 'Test Administrator Name';
export const SHORT_LABEL_FOR_TEST_AUTHORITY_NAME = 'TA Name';
export const LABEL_FOR_TEST_AUTHORITY_UPDATED_FIELD = 'Date Updated';
export const LABEL_FOR_TEST_AUTHORITY_REGISTRATION_CODE = 'Registration Code';
export const LABEL_FOR_TEST_AUTHORITY_STATUS = 'Status';

export const NAME_FOR_TEST_AUTHORITY_NAME_FIELD = 'name';
export const NAME_FOR_TEST_AUTHORITY_ID_FIELD = 'taId';
export const NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD = 'email';
export const NAME_FOR_TEST_AUTHORITY_UPDATED_FIELD = 'updatedAt';
export const NAME_FOR_TEST_AUTHORITY_REGISTRATION_CODE_FIELD =
    'registrationCode';
export const NAME_FOR_TEST_AUTHORITY_STATUS_FIELD = 'status';

export const FORM_FIELD_TEST_AUTHORITY_NAME = {
    name: NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    label: LABEL_FOR_TEST_AUTHORITY_NAME,
    render: (fieldProps) => (
        <TextInput
            required
            fieldLabel={LABEL_FOR_TEST_AUTHORITY_NAME}
            autoComplete="off"
            FormHelperTextProps={{
                role: 'alert',
            }}
            {...fieldProps}
        />
    ),
    validation: Yup.string().max(120).required(),
};
export const getFormFieldForTestAuthorityId = (disabled = false) => ({
    name: NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    label: LABEL_FOR_TEST_AUTHORITY_ID,
    render: (fieldProps) => (
        <TextInput
            required={!disabled}
            fieldLabel={LABEL_FOR_TEST_AUTHORITY_ID}
            autoComplete="off"
            FormHelperTextProps={{
                role: 'alert',
            }}
            disabled={disabled}
            {...fieldProps}
        />
    ),
    validation: Yup.string()
        .matches(
            /^[a-z]{4}$/i,
            'Incorrect Format: This is a 4-letter ID (ex: ABCD)',
        )
        .required(),
});

export const FORM_FIELD_TEST_AUTHORITY_EMAIL = {
    name: NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    label: LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
    render: (fieldProps) => (
        <TextInput
            required
            fieldLabel={LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS}
            autoComplete="off"
            FormHelperTextProps={{
                role: 'alert',
            }}
            {...fieldProps}
        />
    ),
    validation: Yup.string().email().max(120).required(),
};

/* This file is meant to store constants used across many components/screens/etc. - things related to test authorities */
export const TEST_AUTHORITY_INITAL_VALUES_MAP = {
    [NAME_FOR_TEST_AUTHORITY_NAME_FIELD]: '',
    [NAME_FOR_TEST_AUTHORITY_ID_FIELD]: '',
    [NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD]: '',
};
export const TEST_AUTHORITY_API_FIELD_LABELS_MAP = {
    [NAME_FOR_TEST_AUTHORITY_NAME_FIELD]: LABEL_FOR_TEST_AUTHORITY_NAME,
    [NAME_FOR_TEST_AUTHORITY_ID_FIELD]: LABEL_FOR_TEST_AUTHORITY_ID,
    [NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD]: LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
};
export const TEST_AUTHORITY_STATUS_ACTIVE = 'active';
export const TEST_AUTHORITY_STATUS_INACTIVE = 'inactive';
