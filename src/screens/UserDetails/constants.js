import React from 'react';
import {
    FORM_FIELD_USER_FIRST_NAME,
    FORM_FIELD_USER_LAST_NAME,
    LABEL_FOR_USER_EMAIL_ADDRESS,
    NAME_FOR_USER_EMAIL_FIELD,
    USER_STATUS_AUTHORIZED,
} from '../../userConstants';
import TextInput from '../../common/TextInput';
import * as Yup from 'yup';

export const TITLE_FOR_UPDATE_USER = 'User Administration';
export const SUBMIT_BUTTON_TEXT_FOR_APPROVE_USER = 'Save';
export const LABEL_FOR_DEACTIVATE_BUTTON = 'Un-Authorize';
export const LABEL_FOR_ACTIVATE_BUTTON = 'Authorize';

export const getLabelForExtraActionButton = (status) => {
    return status === USER_STATUS_AUTHORIZED
        ? LABEL_FOR_DEACTIVATE_BUTTON
        : LABEL_FOR_ACTIVATE_BUTTON;
};

export const getFieldsForUpdateUser = (classes) => [
    FORM_FIELD_USER_FIRST_NAME,
    FORM_FIELD_USER_LAST_NAME,
    {
        name: NAME_FOR_USER_EMAIL_FIELD,
        label: LABEL_FOR_USER_EMAIL_ADDRESS,
        render: (fieldProps) => (
            <TextInput
                disabled
                fieldLabel={LABEL_FOR_USER_EMAIL_ADDRESS}
                autoComplete="off"
                {...fieldProps}
            />
        ),
        validation: Yup.string().email().max(120).required(),
    },
];
