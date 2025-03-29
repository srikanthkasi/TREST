import React from 'react';
import TextInput from './common/TextInput';
import * as Yup from 'yup';

export const LABEL_FOR_USER_ID = 'User Identifier';
export const SHORT_LABEL_FOR_USER_ID = 'User Identifier';
export const LABEL_FOR_USER_EMAIL_ADDRESS = 'Email Address';
export const LABEL_FOR_USER_FIRST_NAME = 'User First Name';
export const SHORT_LABEL_FOR_USER_FIRST_NAME = 'First Name';
export const LABEL_FOR_USER_LAST_NAME = 'User Last Name';
export const SHORT_LABEL_FOR_USER_LAST_NAME = 'Last Name';
export const LABEL_FOR_USER_UPDATED_FIELD = 'Date Updated';
export const LABEL_FOR_USER_REGISTRATION_CODE = 'OKTA ID';
export const LABEL_FOR_USER_STATUS = 'Status';

export const NAME_FOR_USER_FIRST_NAME_FIELD = 'firstName';
export const NAME_FOR_USER_LAST_NAME_FIELD = 'lastName';
export const NAME_FOR_USER_ID_FIELD = 'id';
export const NAME_FOR_USER_EMAIL_FIELD = 'email';
export const NAME_FOR_USER_UPDATED_FIELD = 'updatedAt';
export const NAME_FOR_USER_OKTA_ID_FIELD =
    'oktaId';
export const NAME_FOR_USER_STATUS_FIELD = 'status';

export const FORM_FIELD_USER_FIRST_NAME = {
    name: NAME_FOR_USER_FIRST_NAME_FIELD,
    label: LABEL_FOR_USER_FIRST_NAME,
    render: (fieldProps) => (
        <TextInput
            fieldLabel={LABEL_FOR_USER_FIRST_NAME}
            autoComplete="off"
            FormHelperTextProps={{
                role: 'alert',
            }}
            disabled
            {...fieldProps}
        />
    ),
    validation: Yup.string().max(120),
};

export const FORM_FIELD_USER_LAST_NAME = {
    name: NAME_FOR_USER_LAST_NAME_FIELD,
    label: LABEL_FOR_USER_LAST_NAME,
    render: (fieldProps) => (
        <TextInput
            fieldLabel={LABEL_FOR_USER_LAST_NAME}
            autoComplete="off"
            FormHelperTextProps={{
                role: 'alert',
            }}
            disabled
            {...fieldProps}
        />
    ),
    validation: Yup.string().max(120),
};

export const FORM_FIELD_USER_EMAIL = {
    name: NAME_FOR_USER_EMAIL_FIELD,
    label: LABEL_FOR_USER_EMAIL_ADDRESS,
    render: (fieldProps) => (
        <TextInput
            required
            fieldLabel={LABEL_FOR_USER_EMAIL_ADDRESS}
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
export const USER_INITAL_VALUES_MAP = {
    [NAME_FOR_USER_FIRST_NAME_FIELD]: '',
    [NAME_FOR_USER_LAST_NAME_FIELD]: '',
    [NAME_FOR_USER_ID_FIELD]: '',
    [NAME_FOR_USER_EMAIL_FIELD]: '',
};
export const USER_API_FIELD_LABELS_MAP = {
    [NAME_FOR_USER_FIRST_NAME_FIELD]: LABEL_FOR_USER_FIRST_NAME,
    [NAME_FOR_USER_LAST_NAME_FIELD]: LABEL_FOR_USER_LAST_NAME,
    [NAME_FOR_USER_ID_FIELD]: LABEL_FOR_USER_ID,
    [NAME_FOR_USER_EMAIL_FIELD]: LABEL_FOR_USER_EMAIL_ADDRESS,
};
export const USER_STATUS_PENDING = 'PENDING';
export const USER_STATUS_AUTHORIZED = 'AUTHORIZED';
export const USER_STATUS_UNAUTHORIZED = 'NOT_AUTHORIZED';
