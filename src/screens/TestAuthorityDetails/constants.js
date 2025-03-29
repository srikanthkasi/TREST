import React from 'react';
import {
    FORM_FIELD_TEST_AUTHORITY_NAME,
    getFormFieldForTestAuthorityId,
    LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
    NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    TEST_AUTHORITY_STATUS_ACTIVE,
} from '../../testAuthorityConstants';
import TextInput from '../../common/TextInput';
import * as Yup from 'yup';

export const TITLE_FOR_UPDATE_TEST_AUTHORITY = 'TA Account Administration';
export const DESCRIPTION_FOR_REGISTRATION_CODE =
    'This code has been sent directly to the Test Administrator (TA) along with their TA Identifier (TAID) to allow the TA to activate their account for the UAS Trust system.';
export const SUBMIT_BUTTON_TEXT_FOR_UPDATE_TEST_AUTHORITY = 'Save';
export const LABEL_FOR_DEACTIVATE_BUTTON = 'Deactivate Account';
export const LABEL_FOR_ACTIVATE_BUTTON = 'Activate Account';

export const getLabelForExtraActionButton = (status) => {
    return status === TEST_AUTHORITY_STATUS_ACTIVE
        ? LABEL_FOR_DEACTIVATE_BUTTON
        : LABEL_FOR_ACTIVATE_BUTTON;
};

export const getFieldsForUpdateTestAuthority = (classes) => [
    FORM_FIELD_TEST_AUTHORITY_NAME,
    getFormFieldForTestAuthorityId(true),
    {
        name: NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
        label: LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
        render: (fieldProps) => (
            <TextInput
                disabled
                fieldLabel={LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS}
                autoComplete="off"
                {...fieldProps}
            />
        ),
        validation: Yup.string().email().max(120).required(),
    },
];

export const NAME_FOR_TEST_AUTHORITY_PENDING_FIELD = 'pending';
