import {
    LABEL_FOR_USER_STATUS,
    LABEL_FOR_USER_UPDATED_FIELD,
    LABEL_FOR_USER_EMAIL_ADDRESS,
    NAME_FOR_USER_EMAIL_FIELD,
    NAME_FOR_USER_ID_FIELD,
    NAME_FOR_USER_FIRST_NAME_FIELD,
    NAME_FOR_USER_LAST_NAME_FIELD,
    NAME_FOR_USER_STATUS_FIELD,
    NAME_FOR_USER_UPDATED_FIELD,
    SHORT_LABEL_FOR_USER_FIRST_NAME,
    SHORT_LABEL_FOR_USER_LAST_NAME,
    SHORT_LABEL_FOR_USER_ID
} from '../../userConstants';

export const USER_ADMINISTRATION_TABLE_COLUMNS = [
    {
        Header: SHORT_LABEL_FOR_USER_ID,
        accessor: NAME_FOR_USER_ID_FIELD,
    },
    {
        Header: LABEL_FOR_USER_UPDATED_FIELD,
        accessor: NAME_FOR_USER_UPDATED_FIELD,
    },
    {
        Header: SHORT_LABEL_FOR_USER_FIRST_NAME,
        accessor: NAME_FOR_USER_FIRST_NAME_FIELD,
    },
    {
        Header: SHORT_LABEL_FOR_USER_LAST_NAME,
        accessor: NAME_FOR_USER_LAST_NAME_FIELD,
    },
    {
        Header: LABEL_FOR_USER_EMAIL_ADDRESS,
        accessor: NAME_FOR_USER_EMAIL_FIELD,
    },
    {
        Header: LABEL_FOR_USER_STATUS,
        accessor: NAME_FOR_USER_STATUS_FIELD,
    },
];

export const ITEMS_PER_PAGE = 8;

export const TEXT_FOR_FILTER_BY = 'Filter by';
export const LABEL_FOR_FILTERS = 'All';
export const LABEL_FOR_PENDING_STATUS_FILTER = 'Pending';
export const LABEL_FOR_AUTHORIZED_STATUS_FILTER = 'Authorized';
export const LABEL_FOR_UNAUTHORIZED_STATUS_FILTER = 'Not Authorized';

export const DISPLAY_FORMAT_FOR_UPDATED_DATE = 'M.d.yyyy';

export const TABLE_SCOPES = {
    [LABEL_FOR_USER_UPDATED_FIELD]: 'row',
};
