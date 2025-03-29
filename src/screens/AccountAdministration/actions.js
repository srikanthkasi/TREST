const PREFIX = 'TAAccountAdministration/';

export const FETCH_TEST_AUTHORITIES_REQUESTED = `${PREFIX}FETCH_TEST_AUTHORITIES_REQUESTED`;
export const FETCH_TEST_AUTHORITIES_SUCCEEDED = `${PREFIX}FETCH_TEST_AUTHORITIES_SUCCEEDED`;
export const FETCH_TEST_AUTHORITIES_FAILED = `${PREFIX}FETCH_TEST_AUTHORITIES_FAILED`;

export const SET_STATUS_FILTER = `${PREFIX}SET_STATUS_FILTER`;
export const SET_SEARCH = `${PREFIX}SET_SEARCH`;
export const SET_PREVIOUS_SEARCH = `${PREFIX}SET_PREVIOUS_SEARCH`;
export const SET_PAGE_INDEX = `${PREFIX}SET_PAGE_INDEX`;

export const fetchTestAuthoritiesRequested = (
    itemsPerPage,
    pageIndex,
    sortBy = null,
    search = null,
    statusFilter = null,
) => ({
    type: FETCH_TEST_AUTHORITIES_REQUESTED,
    itemsPerPage,
    pageIndex,
    sortBy,
    search,
    statusFilter,
});

export const fetchTestAuthoritiesSucceeded = (testAuthorities, totalItems) => ({
    type: FETCH_TEST_AUTHORITIES_SUCCEEDED,
    testAuthorities,
    totalItems,
});

export const fetchTestAuthoritiesFailed = (errors) => ({
    type: FETCH_TEST_AUTHORITIES_FAILED,
    errors,
});

export const setStatusFilter = (statusFilter) => ({
    type: SET_STATUS_FILTER,
    statusFilter,
});

export const setSearch = (search) => ({
    type: SET_SEARCH,
    search,
});

export const setPageIndex = (pageIndex = 0) => ({
    type: SET_PAGE_INDEX,
    pageIndex,
});

export const setPreviousSearch = (previousSearch = null) => ({
    type: SET_PREVIOUS_SEARCH,
    previousSearch,
});
