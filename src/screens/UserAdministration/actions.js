const PREFIX = 'UserAdministration/';

export const FETCH_USERS_REQUESTED = `${PREFIX}FETCH_USERS_REQUESTED`;
export const FETCH_USERS_SUCCEEDED = `${PREFIX}FETCH_USERS_SUCCEEDED`;
export const FETCH_USERS_FAILED = `${PREFIX}FETCH_USERS_FAILED`;

export const SET_STATUS_FILTER = `${PREFIX}SET_STATUS_FILTER`;
export const SET_USER_SEARCH = `${PREFIX}SET_USER_SEARCH`;
export const SET_PREVIOUS_SEARCH = `${PREFIX}SET_PREVIOUS_SEARCH`;
export const SET_PAGE_INDEX = `${PREFIX}SET_PAGE_INDEX`;

export const fetchUsersRequested = (
    itemsPerPage,
    pageIndex,
    sortBy = null,
    search = null,
    statusFilter = null,
) => ({
    type: FETCH_USERS_REQUESTED,
    itemsPerPage,
    pageIndex,
    sortBy,
    search,
    statusFilter,
});

export const fetchUsersSucceeded = (users, totalItems) => ({
    type: FETCH_USERS_SUCCEEDED,
    users,
    totalItems,
});

export const fetchUsersFailed = (errors) => ({
    type: FETCH_USERS_FAILED,
    errors,
});

export const setStatusFilter = (statusFilter) => ({
    type: SET_STATUS_FILTER,
    statusFilter,
});

export const setUserSearch = (search) => ({
    type: SET_USER_SEARCH,
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
