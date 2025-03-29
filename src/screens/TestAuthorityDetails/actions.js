const PREFIX = 'TestAuthorityDetails/';

export const FETCH_TEST_AUTHORITY_REQUESTED = `${PREFIX}FETCH_TEST_AUTHORITY_REQUESTED`;
export const FETCH_TEST_AUTHORITY_SUCCEEDED = `${PREFIX}FETCH_TEST_AUTHORITY_SUCCEEDED`;
export const FETCH_TEST_AUTHORITY_FAILED = `${PREFIX}FETCH_TEST_AUTHORITY_FAILED`;

export const UPDATE_TEST_AUTHORITY_REQUESTED = `${PREFIX}UPDATE_TEST_AUTHORITY_REQUESTED`;
export const UPDATE_TEST_AUTHORITY_SUCCEEDED = `${PREFIX}UPDATE_TEST_AUTHORITY_SUCCEEDED`;
export const UPDATE_TEST_AUTHORITY_FAILED = `${PREFIX}UPDATE_TEST_AUTHORITY_FAILED`;

export const fetchTestAuthorityRequested = (taId) => ({
    type: FETCH_TEST_AUTHORITY_REQUESTED,
    taId,
});

export const fetchTestAuthoritySucceeded = (testAuthority) => ({
    type: FETCH_TEST_AUTHORITY_SUCCEEDED,
    testAuthority,
});

export const fetchTestAuthorityFailed = (errors) => ({
    type: FETCH_TEST_AUTHORITY_FAILED,
    errors,
});

export const updateTestAuthorityRequested = (testAuthority) => ({
    type: UPDATE_TEST_AUTHORITY_REQUESTED,
    testAuthority,
});

export const updateTestAuthoritySucceeded = (testAuthority) => ({
    type: UPDATE_TEST_AUTHORITY_SUCCEEDED,
    testAuthority,
});

export const updateTestAuthorityFailed = (errors, testAuthority) => ({
    type: UPDATE_TEST_AUTHORITY_FAILED,
    errors,
    testAuthority,
});
