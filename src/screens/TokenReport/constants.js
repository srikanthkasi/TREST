import {
    LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
    NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    LABEL_FOR_TEST_AUTHORITY_STATUS,
    NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
    NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    SHORT_LABEL_FOR_TEST_AUTHORITY_ID,
    SHORT_LABEL_FOR_TEST_AUTHORITY_NAME,
} from '../../testAuthorityConstants';
import React from 'react';
import {
    ArrowDropDown as ArrowDropDownIcon,
    Close as CloseIcon,
} from '@material-ui/icons';

export const NAME_FOR_TEST_AUTHORITY_NAME_FIELD = 'name';
export const LABEL_FOR_TOKEN_REPORT_SUBMITTED_FIELD = 'Tokens Submitted';
export const NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD = 'tokensSubmitted';
export const NAME_FOR_TOKEN_REPORT_COUNT_FIELD = 'tokensCount';

export const TA_TOKEN_REPORT_TABLE_COLUMNS = [
    {
        Header: SHORT_LABEL_FOR_TEST_AUTHORITY_ID,
        accessor: NAME_FOR_TEST_AUTHORITY_ID_FIELD,
    },
    {
        Header: SHORT_LABEL_FOR_TEST_AUTHORITY_NAME,
        accessor: NAME_FOR_TEST_AUTHORITY_NAME_FIELD,
    },
    {
        Header: LABEL_FOR_TEST_AUTHORITY_EMAIL_ADDRESS,
        accessor: NAME_FOR_TEST_AUTHORITY_EMAIL_FIELD,
    },
    {
        Header: LABEL_FOR_TEST_AUTHORITY_STATUS,
        accessor: NAME_FOR_TEST_AUTHORITY_STATUS_FIELD,
    },
    {
        Header: LABEL_FOR_TOKEN_REPORT_SUBMITTED_FIELD,
        accessor: NAME_FOR_TOKEN_REPORT_SUBMITTED_FIELD,
    },
];

export const ITEMS_PER_PAGE = 8;

export const LABEL_FOR_FILTER = 'Testing Authorities';

export const TABLE_SCOPES = {
    [SHORT_LABEL_FOR_TEST_AUTHORITY_ID]: 'row',
};

export const AUTOCOMPLETE_POPUP_ICON = (
    <ArrowDropDownIcon
        role="button"
        tabindex="0"
        focusable="true"
        aria-hidden="false"
        aria-label="Click or press Enter for Autocomplete Dropdown menu"
    />
);

export const AUTOCOMPLETE_CLOSE_ICON = (
    <CloseIcon
        fontSize="small"
        role="button"
        tabindex="0"
        focusable="true"
        aria-hidden="false"
        aria-label="Click or press Enter to clear the Autocomplete selection"
    />
);
