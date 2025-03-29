const PREFIX = 'CreateTestAuthority/';
export const CREATE_TEST_AUTHORITY_REQUESTED = `${PREFIX}CREATE_TEST_AUTHORITY_REQUESTED`;
export const CREATE_TEST_AUTHORITY_SUCCEEDED = `${PREFIX}CREATE_TEST_AUTHORITY_SUCCEEDED`;
export const CREATE_TEST_AUTHORITY_FAILED = `${PREFIX}CREATE_TEST_AUTHORITY_FAILED`;

export const createTestAuthorityRequested = (testAuthority) => ({
    type: CREATE_TEST_AUTHORITY_REQUESTED,
    testAuthority,
});

export const createTestAuthoritySucceeded = (testAuthority) => ({
    type: CREATE_TEST_AUTHORITY_SUCCEEDED,
    testAuthority,
});

export const createTestAuthorityFailed = (errors) => ({
    type: CREATE_TEST_AUTHORITY_FAILED,
    errors,
});
