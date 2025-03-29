import {
    FORM_FIELD_TEST_AUTHORITY_EMAIL,
    getFormFieldForTestAuthorityId,
    FORM_FIELD_TEST_AUTHORITY_NAME,
} from '../../testAuthorityConstants';

export const TITLE_FOR_CREATE_TEST_AUTHORITY = 'Create a new TA Account';

export const FIELDS_FOR_CREATE_TEST_AUTHORITY = [
    FORM_FIELD_TEST_AUTHORITY_NAME,
    getFormFieldForTestAuthorityId(),
    FORM_FIELD_TEST_AUTHORITY_EMAIL,
];

export const SUBMIT_BUTTON_TEXT_FOR_CREATE_TEST_AUTHORITY = 'Create';
