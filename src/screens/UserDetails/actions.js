const PREFIX = 'UserDetails/';

export const FETCH_USER_REQUESTED = `${PREFIX}FETCH_USER_REQUESTED`;
export const FETCH_USER_SUCCEEDED = `${PREFIX}FETCH_USER_SUCCEEDED`;
export const FETCH_USER_FAILED = `${PREFIX}FETCH_USER_FAILED`;

export const UPDATE_USER_REQUESTED = `${PREFIX}UPDATE_USER_REQUESTED`;
export const UPDATE_USER_SUCCEEDED = `${PREFIX}UPDATE_USER_SUCCEEDED`;
export const UPDATE_USER_FAILED = `${PREFIX}UPDATE_USER_FAILED`;

export const fetchUserRequested = (id) => ({
    type: FETCH_USER_REQUESTED,
    id,
});

export const fetchUserSucceeded = (user) => ({
    type: FETCH_USER_SUCCEEDED,
    user,
});

export const fetchUserFailed = (errors) => ({
    type: FETCH_USER_FAILED,
    errors,
});

export const updateUserRequested = (user) => ({
    type: UPDATE_USER_REQUESTED,
    user,
});

export const updateUserSucceeded = (user) => ({
    type: UPDATE_USER_SUCCEEDED,
    user,
});

export const updateUserFailed = (errors, user) => ({
    type: UPDATE_USER_FAILED,
    errors,
    user,
});
